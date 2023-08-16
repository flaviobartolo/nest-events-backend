import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { Event } from './event.entity';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { Like, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('/events')
export class EventsController {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  @Get()
  async findAll() {
    return this.repository.find();
  }

  @Get('/practice')
  async practice() {
    return await this.repository.find({
      select: ['id', 'when'],
      where: [
        {
          id: MoreThan(3),
          when: MoreThan(new Date('2021-02-12T13:00:00')),
        },
        {
          description: Like('%meet%'),
        },
      ],
      take: 2,
      order: {
        id: 'DESC'
      },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    const event = this.repository.findOneBy({ id });
    return event;
  }

  @Post()
  async create(@Body() input: CreateEventDto) {
    const event = {
      ...input,
      when: new Date(input.when),
    };
    return await this.repository.save(event);
  }

  @Patch(':id')
  async update(@Body() input: UpdateEventDto, @Param('id') id) {
    let event = await this.repository.findOneBy({ id });
    if (!event) {
      const error = new Error('no event found');
      return error;
    }

    event = {
      ...event,
      ...input,
      when: input.when ? new Date(input.when) : event.when,
    };
    return await this.repository.save(event);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id) {
    const event = await this.repository.findOneBy({ id });
    return await this.repository.remove(event);
  }
}
