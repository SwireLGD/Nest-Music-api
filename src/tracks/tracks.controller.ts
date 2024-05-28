import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Track, TrackDocument } from 'src/schemas/track.schema';
import { CreateTrackDto } from './create-track.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { TokenAuthGuard } from 'src/auth/token-auth.guard';

@Controller('tracks')
export class TracksController {
  constructor(
    @InjectModel(Track.name)
    private trackModel: Model<TrackDocument>,
  ) {}

  @Get()
  async getAll(@Query('albumId') albumId: string) {
    const filter = albumId ? { album: albumId } : {};
    return await this.trackModel.find(filter).populate('album');
  }

  @UseGuards(TokenAuthGuard)
  @Post()
  async create(@Body() trackDto: CreateTrackDto) {
    const track = new this.trackModel({
      title: trackDto.title,
      album: trackDto.album,
      duration: trackDto.duration,
      number: trackDto.number,
      isPublished: trackDto.isPublished,
    });

    return await track.save();
  }

  @UseGuards(TokenAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.trackModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(
        'Something went wrong, could not delete the track or it does not exist',
      );
    }
    return { message: 'Track deleted successesfully' };
  }
}