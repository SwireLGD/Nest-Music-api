import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Album } from "./album.schema";

@Schema()
export class Track {
    @Prop({ required: true })
    title: string;

    @Prop({ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: Album.name, 
        required: true,
        validate: {
            validator: async function (id: Types.ObjectId) {
                const album = await this.model('Album').findById(id);
                return Boolean(album);
            },
            message: 'Album does not exist',
        },
    })
    album: mongoose.Schema.Types.ObjectId;

    @Prop()
    duration: number;

    @Prop({ required: true })
    number: number;

    @Prop({ default: false })
    isPublished: boolean;
}

export type TrackDocument = Track & Document;
export const TrackSchema = SchemaFactory.createForClass(Track);