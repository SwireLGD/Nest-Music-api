import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Track, TrackDocument } from 'src/schemas/track.schema';
import { CreateTrackDto } from './create-track.dto';

@Controller('tracks')
export class TracksController {
    constructor (
        @InjectModel(Track.name)
        private trackModel: Model<TrackDocument>
    ) {}

    @Get()
    async getAll() {
        return await this.trackModel.find();
    }

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
}