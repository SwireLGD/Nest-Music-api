import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Album, AlbumDocument } from 'src/schemas/album.schema';
import { CreateAlbumDto } from './create-album.dto';

@Controller('albums')
export class AlbumsController {
    constructor (
        @InjectModel(Album.name)
        private albumModel: Model<AlbumDocument>
    ) {}

    @Get()
    async getAll() {
        return await this.albumModel.find();
    }

    @Get(':id')
    async getOne(@Param ('id') id: string) {
        return await this.albumModel.findById({_id: id});
    }

    @Post()
    async create(@Body() albumDto: CreateAlbumDto) {
        const album = new this.albumModel({
            title: albumDto.title,
            artist: albumDto.artist,
            issueDate: albumDto.issueDate,
            isPublished: albumDto.isPublished,
        });

        return await album.save();
    }
}