import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/request/create-customer.dto';
import { UsersService } from './users.service';
import { CreateWorkerDto } from './dto/request/create-worker.dto';
import { CustomerResponse } from './dto/response/customer-response.dto';
import { WorkerResponse } from './dto/response/worker-response.dto';
import { UpdateCustomerDto } from './dto/request/update-customer.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserResponse } from './dto/response/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('customers')
  async createCustomerUser(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerResponse> {
    return this.usersService.createCustomer(createCustomerDto);
  }

  @Post('customers/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async updateCustomer(
    @CurrentUser() user: UserResponse,
    @Param('id') customerId,
    @Body() updateCustomer: UpdateCustomerDto,
  ): Promise<CustomerResponse> {
    if (user.id !== parseInt(customerId)) {
      throw new HttpException(
        'You are not authorized to perform this action.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.usersService.updateCustomer(customerId, updateCustomer);
  }

  @Post('workers')
  async createWorkerUser(
    @Body() createWorkerDto: CreateWorkerDto,
  ): Promise<WorkerResponse> {
    return this.usersService.createWorker(createWorkerDto);
  }
}
