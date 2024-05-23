import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Album } from "./album.schema";
import mongoose from "mongoose";

@Schema()
export class Track {
    @Prop({ required: true })
    title: string;

    @Prop({ ref: typeof Album, required: true })
    album: mongoose.Schema.Types.ObjectId

    @Prop()
    duration: number;

    @Prop({ required: true })
    number: number;

    @Prop({ default: false })
    isPublished: boolean;
}

export type TrackDocument = Track & Document;
export const TrackSchema = SchemaFactory.createForClass(Track);