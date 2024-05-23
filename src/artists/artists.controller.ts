import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist, ArtistDocument } from 'src/schemas/artist.schema';
import { CreateArtistDto } from './create-artist.dto';

@Controller('artists')
export class ArtistsController {
    constructor (
        @InjectModel(Artist.name)
        private artistModel: Model<ArtistDocument>
    ) {}

    @Get()
    async getAll() {
        return await this.artistModel.find();
    }

    @Get(':id')
    async getOne(@Param ('id') id: string) {
        return await this.artistModel.findById({_id: id});
    }

    @Post()
    async create(@Body() artistDto: CreateArtistDto) {
        const artist = new this.artistModel({
            name: artistDto.name,
            info: artistDto.info,
            isPublished: artistDto.isPublished,
        });

        return await artist.save();
    }
}