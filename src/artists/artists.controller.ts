import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist, ArtistDocument } from 'src/schemas/artist.schema';
import { CreateArtistDto } from './create-artist.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { artistImages } from 'src/multer';

@Controller('artists')
export class ArtistsController {
  constructor(
    @InjectModel(Artist.name)
    private artistModel: Model<ArtistDocument>,
  ) {}

  @Get()
  async getAll() {
    return await this.artistModel.find();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.artistModel.findById({ _id: id });
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: artistImages }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() artistDto: CreateArtistDto,
  ) {
    const artist = new this.artistModel({
      name: artistDto.name,
      info: artistDto.info,
      isPublished: artistDto.isPublished,
      image: file ? '/images/' + file.filename : null,
    });

    return await artist.save();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.artistModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(
        'Something went wrong, could not delete the track or it does not exist',
      );
    }
    return { message: 'Track deleted successesfully' };
  }
}
