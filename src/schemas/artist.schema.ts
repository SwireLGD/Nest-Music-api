import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Artist {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop()
    info: string;

    @Prop({ required: true })
    isPublished: string;

    @Prop()
    image: string | null;
}

export type ArtistDocument = Artist & Document;
export const ArtistSchema = SchemaFactory.createForClass(Artist);