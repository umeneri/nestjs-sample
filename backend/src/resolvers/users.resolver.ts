import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { User } from '../@generated/user/user.model';
import * as crypto from 'crypto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [User])
  async users() {
    return this.prisma.user.findMany();
  }

  @Mutation(() => User)
  async createUser(@Args('email') email: string, @Args('name') name: string) {
    const id = crypto.randomUUID();
    return this.prisma.user.create({ data: { id, email, name } });
  }
}
