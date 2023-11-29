import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entities/product.entity';
import { ProductModule } from './product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { ConfigurationKeys } from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: true,
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>(ConfigurationKeys.DB_HOST),
        port: +configService.get<number>(ConfigurationKeys.DB_PORT),
        username: configService.get<string>(ConfigurationKeys.DB_USER),
        password: configService.get<string>(ConfigurationKeys.DB_PASSWORD),
        database: configService.get<string>(ConfigurationKeys.DB_NAME),
        entities: [Product],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
