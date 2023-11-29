import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateProductCommandHandler } from './command/CreateProductCommandHandler';
import { CreateProductCommand } from './command/CreateProductCommand';
import { GetProductQueryHandler } from './query/ProductSearchQueryHandler';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productHandler: CreateProductCommandHandler,
    private readonly getProductQueryHandler: GetProductQueryHandler,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Body() command: CreateProductCommand) {
    await this.productHandler.execute(command);
    return {
      success: true,
    };
  }

  @Get()
  @HttpCode(200)
  async get() {
    const response = await this.getProductQueryHandler.execute();

    return {
      success: true,
      data: response,
    };
  }
}
