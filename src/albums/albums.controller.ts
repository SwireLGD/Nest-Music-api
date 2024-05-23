import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Album, AlbumDocument } from 'src/schemas/album.schema';
import { CreateAlbumDto } from './create-album.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('albums')
export class AlbumsController {
  constructor(
    @InjectModel(Album.name)
    private albumModel: Model<AlbumDocument>,
  ) {}

  @Get()
  async getAll(@Query('artistId') artistId: string) {
    const filter = artistId ? { artist: artistId } : {};
    return await this.albumModel.find(filter).populate('artist');
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.albumModel.findById({ _id: id });
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', { dest: './public/images/' }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() albumDto: CreateAlbumDto,
  ) {
    const album = new this.albumModel({
      title: albumDto.title,
      artist: albumDto.artist,
      issueDate: albumDto.issueDate,
      isPublished: albumDto.isPublished,
      image: file ? '/images/' + file.filename : null,
    });

    return await album.save();
  }
}
