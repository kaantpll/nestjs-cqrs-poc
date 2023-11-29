import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductQuery } from './GetProductQuery';
import { SearchService } from 'src/elastic-search/elastic.service';
import { INDEXES } from 'src/constants';

@QueryHandler(GetProductQuery)
export class GetProductQueryHandler implements IQueryHandler<GetProductQuery> {
  constructor(private readonly searchService: SearchService) {}

  async execute() {
    return this.searchService.getAll(INDEXES.PRODUCT);
  }
}
