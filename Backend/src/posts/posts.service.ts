import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LabourPost } from './entities/labour-post.entity';
import { EntityManager, In, Repository } from 'typeorm';
import { UserResponse } from 'src/users/dto/response/user-response.dto';
import { CreateLabourPostDto } from './dto/request/create-labour-post.dto';
import { LabourPostResponse } from './dto/response/labour-posts-response.dto';
import { Status } from './types/types';
import { UsersService } from 'src/users/users.service';
import { LabourCategory } from './entities/labour-category.entity';
import { CreateLabourCategoryDto } from './dto/request/create-labour-category.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(LabourPost)
    private readonly labourPostsRepository: Repository<LabourPost>,
    @InjectRepository(LabourCategory)
    private readonly labourCategoriesRepository: Repository<LabourCategory>,
    private readonly entityManager: EntityManager,
    private readonly userService: UsersService,
  ) {}

  async getAllLaboursPosts() {
    return this.labourPostsRepository.find();
  }

  async createLabourPost(
    user: UserResponse,
    createLabourPost: CreateLabourPostDto,
  ): Promise<LabourPostResponse> {
    const customer = await this.userService.getCustomerById(user.id);

    if (!customer) {
      throw new HttpException(
        'Only customers can post labour jobs.',
        HttpStatus.FORBIDDEN,
      );
    }

    await this.userService.updateCustomer(customer.id, {
      posts: customer.posts + 1,
    });

    const categories = await this.labourCategoriesRepository.findBy({
      id: In([createLabourPost.categories]),
    });

    if (categories.length !== createLabourPost.categories.length) {
      throw new HttpException(
        `Labour categories not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const labourPost = new LabourPost({
      ...createLabourPost,
      customer: user.id,
      status: Status.Pending,
      datePosted: new Date(),
      isCanceled: false,
      categories: categories,
    });

    return await this.entityManager.save(labourPost);
  }

  async getAllLabourCategories() {
    return this.labourCategoriesRepository.find();
  }

  async createLabourCategory(createLabourCategory: CreateLabourCategoryDto) {
    const categoryByType = await this.labourCategoriesRepository.findOneBy({
      type: createLabourCategory.type,
    });

    if (categoryByType) {
      throw new HttpException(
        'Category already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const category = new LabourCategory({ ...createLabourCategory });

    return await this.entityManager.save(category);
  }
}
