import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './elastic.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigurationKeys } from 'src/config/configuration';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get<string>(ConfigurationKeys.ELASTIC_HOST),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [SearchService],
  exports: [SearchService],
})
export class ElasticModule {}
