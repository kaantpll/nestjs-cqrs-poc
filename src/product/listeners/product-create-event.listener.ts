import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigurationKeys } from 'src/config/configuration';
import { INDEXES } from 'src/constants';
import { SearchService } from 'src/elastic-search/elastic.service';
import { ConsumerService } from 'src/kafka/consumer.service';

@Injectable()
export class ProductCreateEventListener implements OnModuleInit {
  constructor(
    private readonly kafkaService: ConsumerService,
    private readonly elasticService: SearchService,
    private readonly configService: ConfigService,
  ) {}
  async onModuleInit() {
    await this.kafkaService.consume(
      {
        topics: [
          this.configService.get<string>(ConfigurationKeys.KAFKA_PRODUCT_TOPIC),
        ],
      },
      {
        eachMessage: async ({ message }) => {
          try {
            await this.elasticService.createData(
              INDEXES.PRODUCT,
              message.value,
            );
          } catch (err) {
            throw new InternalServerErrorException(
              'Error When Create Elastic Data',
            );
          }
        },
      },
    );
  }
}
