import {
  Controller,
  Get, Post, Patch, Delete,
  Body, Param, Query
} from '@nestjs/common';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Post()
  create(@Body() body: CreateContentDto) {
    return this.contentsService.create(body);
  }

  @Get()
  findAll(@Query() query: UpdateContentDto) {
    return this.contentsService.findAll(query);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.contentsService.findById(+id);
    // +id is shorthand for parseInt(id, 10) and 10 is the radix
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateContentDto
  ) {
    return this.contentsService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentsService.remove(+id);
  }
}
