import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Album {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    artist: string

    @Prop({ required: true })
    issueDate: number

    @Prop({ default: false })
    isPublished: boolean
}

export type AlbumDocument = Album & Document;
export const AlbumSchema = SchemaFactory.createForClass(Album);