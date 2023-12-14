import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CustomConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { CandidatesModule } from './candidates/candidates.module';
import { ClientsModule } from './clients/clients.module';
import { JobsModule } from './jobs/jobs.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      // @ts-ignore
      useFactory: async (configService: ConfigService) => ({
        type: configService.get('DATABASE_TYPE') as
          | TypeOrmModuleOptions
          | Promise<TypeOrmModuleOptions>,
        database: configService.get('DATABASE_NAME'),
        host: configService.get('DATABASE_URL'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CustomConfigModule,
    AuthModule,
    UsersModule,
    ClientsModule,
    CandidatesModule,
    JobsModule,
  ],
})
export class AppModule {}
