import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsController } from './artists/artists.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TracksController } from './tracks/tracks.controller';
import { Album, AlbumSchema } from './schemas/album.schema';
import { AlbumsController } from './albums/albums.controller';
import { Track, TrackSchema } from './schemas/track.schema';
import { Artist, ArtistSchema } from './schemas/artist.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/musicApi'),
    MongooseModule.forFeature([
      { name: Album.name, schema: AlbumSchema },
      { name: Track.name, schema: TrackSchema },
      { name: Artist.name, schema: ArtistSchema },
    ]),
  ],
  controllers: [
    AppController,
    ArtistsController,
    TracksController,
    AlbumsController,
  ],
  providers: [AppService],
})
export class AppModule {}