import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from './CreateProductCommand';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { ProducerService } from 'src/kafka/producer.service';
import { ConfigService } from '@nestjs/config';
import { ConfigurationKeys } from 'src/config/configuration';

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly kafkaService: ProducerService,
    private readonly configService: ConfigService,
  ) {}

  async execute(command: CreateProductCommand) {
    const { name, price, stock } = command;
    const product = await this.productRepository.save({
      name,
      price,
      stock,
    });

    await this.kafkaService.produce({
      topic: this.configService.get(ConfigurationKeys.KAFKA_PRODUCT_TOPIC),
      messages: [
        {
          value: JSON.stringify(product),
        },
      ],
      acks: 0,
      timeout: 60000,
    });
  }
}
