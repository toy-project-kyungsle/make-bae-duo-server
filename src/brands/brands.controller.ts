import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { Brands } from './brands.entity';
import { CreateBrandsDto } from './dto/create-brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Post()
  async saveBrand(@Body() sentData: CreateBrandsDto) {
    return this.brandsService.saveBrand(sentData);
  }

  @Get('/')
  async findAllBrands(): Promise<Brands[]> {
    return this.brandsService.findAllBrands();
  }

  @Delete('/:id')
  async deleteBrandById(@Param('id') id: number): Promise<number> {
    return this.brandsService.deleteBrand(id);
  }
}
