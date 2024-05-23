import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Artist } from './artist.schema';

@Schema()
export class Album {
  @Prop({ required: true })
  title: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Artist.name,
    required: true,
    validate: {
      validator: async function (id: Types.ObjectId) {
        const artist = await this.model('Artist').findById(id);
        return Boolean(artist);
      },
      message: 'Artist does not exist',
    },
  })
  artist: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  issueDate: number;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop()
  image: string | null;
}

export type AlbumDocument = Album & Document;
export const AlbumSchema = SchemaFactory.createForClass(Album);
