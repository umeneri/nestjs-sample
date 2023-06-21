import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { PostsResolver } from './resolvers/posts.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersResolver } from './resolvers/users.resolver';
import { PostsModule } from './components/posts/posts.module';
import * as path from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import configuration from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: path.join(process.cwd(), '/src/schema.gql'),
    }),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, UsersResolver, PostsResolver],
})
export class AppModule {}
