import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { LabourPostResponse } from './dto/response/labour-posts-response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserResponse } from 'src/users/dto/response/user-response.dto';
import { CreateLabourPostDto } from './dto/request/create-labour-post.dto';
import { LabourCategoryResponse } from './dto/response/labour-category-response.dto';
import { CreateLabourCategoryDto } from './dto/request/create-labour-category.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('labour')
  async getLaborPosts(): Promise<LabourPostResponse[]> {
    return this.postsService.getAllLaboursPosts();
  }

  @Post('labour')
  @UseGuards(JwtAuthGuard)
  async createLabourPost(
    @CurrentUser() user: UserResponse,
    @Body() createLabourPost: CreateLabourPostDto,
  ): Promise<LabourPostResponse> {
    return this.postsService.createLabourPost(user, createLabourPost);
  }

  @Get('categories')
  async getLabourCategories() {
    return this.postsService.getAllLabourCategories();
  }

  @Post('categories')
  @UseGuards(JwtAuthGuard)
  async createLabourCategory(
    @Body() createLabourCategory: CreateLabourCategoryDto,
  ): Promise<LabourCategoryResponse> {
    return this.postsService.createLabourCategory(createLabourCategory);
  }
}
