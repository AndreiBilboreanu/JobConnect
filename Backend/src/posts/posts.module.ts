import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabourPost } from './entities/labour-post.entity';
import { UsersModule } from 'src/users/users.module';
import { LabourCategory } from './entities/labour-category.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([LabourPost, LabourCategory]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
