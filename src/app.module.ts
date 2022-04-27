import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import mainMongoDBConfig from './config/main-mongo-db.config';
import appConfig from './config/app.config';
import usersConfig from './config/users.config';
import authConfig from './config/auth.config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [mainMongoDBConfig,appConfig,usersConfig,authConfig] }),
    UsersModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('mainMongoDB.uri'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectionName: config.get('mainMongoDB.connectionName'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
