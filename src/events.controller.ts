import { Controller, Get, Post, Patch, Delete, Param, Body, HttpCode } from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';

@Controller('/events')
export class EventsController {
  @Get()
  findAll() {
    return [
      {
        id: 1,
        name: 'First event',
      },
      {
        id: 2,
        name: 'Second event',
      } 
    ]
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return {
      id: 2,
      name: 'Second event',
    } 
  }

  @Post()
  create(@Body() input : CreateEventDto) {
  }

  @Patch(':id')
  update(@Body() input, @Param('id') id) {}

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id) {}
}