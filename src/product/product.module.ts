import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { KafkaModule } from 'src/kafka/kafka.module';
import { CreateProductCommandHandler } from './command/CreateProductCommandHandler';
import { ProductController } from './product.controller';
import { GetProductQueryHandler } from './query/ProductSearchQueryHandler';
import { SearchService } from 'src/elastic-search/elastic.service';
import { ElasticModule } from 'src/elastic-search/elastic.module';
import { ProductCreateEventListener } from './listeners/product-create-event.listener';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), KafkaModule, ElasticModule],
  controllers: [ProductController],
  providers: [
    CreateProductCommandHandler,
    GetProductQueryHandler,
    ProductCreateEventListener,
  ],
})
export class ProductModule {}
