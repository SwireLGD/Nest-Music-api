import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Artist } from "./artist.schema";

@Schema()
export class Album {
    @Prop({ required: true })
    title: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Artist.name, required: true })
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