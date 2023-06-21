import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { Post } from '../@generated/post/post.model';
import * as crypto from 'crypto';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Post])
  async posts() {
    return this.prisma.post.findMany();
  }

  @Mutation(() => Post)
  async createPost(
    @Args('title') title: string,
    @Args('content') content: string,
    @Args('authorId') authorId: string,
  ) {
    const id = crypto.randomUUID();
    return this.prisma.post.create({ data: { id, title, content, authorId } });
  }
}
