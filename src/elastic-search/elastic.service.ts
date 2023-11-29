import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  private async createProductIndex(indexName: string): Promise<any> {
    try {
      await this.elasticsearchService.indices.create({
        index: indexName,
        body: {
          mappings: {
            properties: {
              name: {
                type: 'text',
              },
              stock: {
                type: 'integer',
              },
              price: {
                type: 'keyword',
              },
            },
          },
        },
      });

      return true;
    } catch (error) {
      console.error(`Error creating index ${indexName}:`, error);
      throw error;
    }
  }

  async createData(indexName: string, body: any) {
    try {
      const indexExists = await this.elasticsearchService.indices.exists({
        index: indexName,
      });

      if (!indexExists) {
        await this.createProductIndex(indexName);
      }

      await this.elasticsearchService.index({
        index: indexName,
        body: JSON.parse(body),
      });

      return true;
    } catch (error) {
      console.error(`Error adding product to index ${indexName}:`, error);
      throw error;
    }
  }

  async getAll(index: string) {
    try {
      const result = await this.elasticsearchService.search({
        index,
        body: {
          query: {
            match_all: {},
          },
        },
      });

      return result.hits.hits.map((product) => product._source);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
