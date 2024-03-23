import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { User } from './entities/user.entity';
import { Worker } from './entities/worker.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/request/create-customer.dto';
import { CreateCommentDto } from './../items/dto/create-comment.dto';
import { CreateWorkerDto } from './dto/request/create-worker.dto';
import { compare, hash } from 'bcrypt';
import { CustomerResponse } from './dto/response/customer-response.dto';
import { WorkerResponse } from './dto/response/worker-response.dto';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UserResponse } from './dto/response/user-response.dto';
import { UpdateCustomerDto } from './dto/request/update-customer.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customersRepository: Repository<Customer>,
    @InjectRepository(Worker)
    private readonly workersRepository: Repository<Worker>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerResponse> {
    const user = new User({
      ...createCustomerDto.user,
      password: await hash(createCustomerDto.user.password, 10),
      registrationDate: new Date(),
    });

    await this.validateUserRequest(user);

    const customer = new Customer({
      ...CreateCommentDto,
      user,
      posts: 0,
      rezervations: 0,
    });

    const customerResponse = await this.entityManager.save(customer);

    return this.buildCustomerResponse(customerResponse);
  }

  async updateCustomer(
    customerId: number,
    updateCustomer: Partial<UpdateCustomerDto>,
  ) {
    const existingCustomer = await this.customersRepository.findOne({
      where: { id: customerId },
      relations: ['user'],
    });

    if (!existingCustomer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }

    const updatedCustomer = Object.assign(existingCustomer, updateCustomer);

    const savedCustomer = await this.entityManager.save(updatedCustomer);
    return this.buildCustomerResponse(savedCustomer);
  }

  async createWorker(
    createWorkerDto: CreateWorkerDto,
  ): Promise<WorkerResponse> {
    const user = new User({
      ...createWorkerDto.user,
      password: await hash(createWorkerDto.user.password, 10),
      registrationDate: new Date(),
    });

    await this.validateUserRequest(user);

    const worker = new Worker({
      ...createWorkerDto,
      user,
      openToWork: true,
      rating: 0,
    });

    const workerResponse = await this.entityManager.save(worker);

    return this.buildWorkerResponse(workerResponse);
  }

  private buildCustomerResponse(customer: Customer): CustomerResponse {
    return {
      id: customer.id,
      user: {
        id: customer.user.id,
        name: customer.user.name,
        email: customer.user.email,
      },
      posts: customer.posts,
      rezervations: customer.rezervations,
    };
  }

  private buildWorkerResponse(worker: Worker): WorkerResponse {
    return {
      id: worker.id,
      user: {
        id: worker.user.id,
        name: worker.user.name,
        email: worker.user.email,
      },
      openToWork: worker.openToWork,
      rating: worker.rating,
    };
  }

  private buildUserResponse(user: User): UserResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  private async validateUserRequest(createUser: CreateUserDto): Promise<void> {
    const user = await this.getUserByEmail(createUser.email);

    if (user) {
      throw new HttpException(
        'This email already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateUser(email: string, password: string): Promise<UserResponse> {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new HttpException('User does not exist.', HttpStatus.BAD_REQUEST);
    }

    const passwordIsValid = await compare(password, user.password);

    if (!passwordIsValid) {
      throw new HttpException(
        'Credentials are invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.buildUserResponse(user);
  }

  async getUserById(userId: string): Promise<UserResponse> {
    const user = await this.usersRepository.findOne({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.buildUserResponse(user);
  }

  async getCustomerById(customerId: number): Promise<CustomerResponse> {
    const customer = this.customersRepository.findOne({
      where: { id: customerId },
    });

    return customer;
  }

  private async getUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
