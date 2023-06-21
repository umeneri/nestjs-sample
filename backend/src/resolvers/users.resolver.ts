import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { UserCreateInput } from "../@generated/user/user-create.input";
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
  async createUser(@Args('newUser') newUser: UserCreateInput) {
    const {id,email, name} = newUser;
    // const id = crypto.randomUUID();
    return this.prisma.user.create({ data: { id, email, name } });
  }
}
