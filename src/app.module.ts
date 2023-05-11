import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { ProfileModule } from './profile/profile.module';
import { ProductModule } from './product/product.module';
import { UploadModule } from './upload/upload.module';
import { ChatModule } from './chat/chat.module';
import { SmsModule } from './sms/sms.module';

// export interface GqlContext {
//   req: Request;
//   res: Response;
//   payload?: GqlContextPayload;
//   // required for subscription
//   connection: any;
// }
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      context: async ({ req, connectionParams }) => {
        // subscriptions
        if (connectionParams) {
          return {
            req: {
              headers: {
                authorization: connectionParams?.Authorization,
              },
            },
          };
        }
        // queries and mutations
        return { req };
      },
      subscriptions: {
        'graphql-ws': {
          path: '/graphql',
          // onConnect: (connectionParams) => {
          //   if (connectionParams.connectionParams?.Authorization) {
          //     return {
          //       req: {
          //         headers: {
          //           authorization:
          //             connectionParams?.connectionParams?.Authorization,
          //         },
          //       },
          //     };
          //   } else {
          //     return {
          //       req: {
          //         headers: {
          //           authorization: '',
          //         },
          //       },
          //     };
          //   }
          // },
        },
        'subscriptions-transport-ws': true,
      },

      autoSchemaFile: true,
      // debug: true,
      playground: false,
      plugins: [
        process.env.NODE_ENV !== 'production'
          ? ApolloServerPluginLandingPageLocalDefault({ footer: false })
          : ApolloServerPluginLandingPageProductionDefault({
              graphRef: 'bikeapp-graph-22',
              footer: false,
              
            }),
      ],
      formatError: (formattedError) => {
        return formattedError;
      },
    }),
    UsersModule,
    AuthModule,
    ProfileModule,
    ProductModule,
    UploadModule,
    ChatModule,
    SmsModule,
  ],
})
export class AppModule {}
