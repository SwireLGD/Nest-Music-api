import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Artist {
    @Prop({ required: true })
    name: string;

    @Prop()
    info: string

    @Prop({ required: true })
    isPublished: string;
}

export type ArtistDocument = Artist & Document;
export const ArtistSchema = SchemaFactory.createForClass(Artist);