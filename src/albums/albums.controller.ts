import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
import { albumImages } from 'src/multer';

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
  @UseInterceptors(FileInterceptor('image', { storage: albumImages }))
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

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.albumModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(
        'Something went wrong, could not delete the album or it does not exist',
      );
    }
    return { message: 'Album deleted successesfully' };
  }
}
