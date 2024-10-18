import {
  Controller,
  Param, Query, Body,
  Get, Post, Patch, Delete,
} from '@nestjs/common';

import { AppService } from './app.service';

@Controller('content')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getContents(
    @Query('title') title?: string,
    @Query('year') year?: number,
    @Query('genre') genre?: string,
    @Query('director') director?: string,
    @Query('character') character?: string
  ) {
    return this.appService.searchAllContents(title, year, genre, director, character);
  }

  @Get(':id')
  getContent(@Param('id') id: string) {
    return this.appService.searchContentById(+id);
    // +id is shorthand for parseInt(id, 10) and 10 is the radix
  }

  @Post()
  postContent(
    @Body('title') title: string,
    @Body('year') year: number,
    @Body('genre') genre: string,
    @Body('director') director: string,
    @Body('characters') characters: string[]
  ) {
    return this.appService.uploadContent(title, year, genre, director, characters);
  }

  @Patch(':id')
  patchContent(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('year') year: number,
    @Body('genre') genre: string,
    @Body('director') director: string,
    @Body('characters') characters: string[]
  ) {
    return this.appService.updateContent(+id, title, year, genre, director, characters);
  }

  @Delete(':id')
  deleteContent(@Param('id') id: string) {
    return this.appService.deleteContent(+id);
  }
}
