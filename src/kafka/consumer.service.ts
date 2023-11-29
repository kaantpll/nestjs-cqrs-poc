import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';
import { ConfigurationKeys } from 'src/config/configuration';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  constructor(private readonly configService: ConfigService) {}
  private readonly kafka = new Kafka({
    brokers: [this.configService.get<string>(ConfigurationKeys.KAFKA_BROKER)],
  });

  private readonly consumers: Consumer[] = [];

  async consume(topics: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    const consumer = this.kafka.consumer({
      groupId: this.configService.get<string>(ConfigurationKeys.KAFKA_GROUP_ID),
    });

    await consumer.connect();

    await consumer.subscribe(topics);

    await consumer.run(config);

    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
