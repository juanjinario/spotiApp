import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent {

  topTracks: any[] = [];
  artist: any = {};
  loading: boolean;

  constructor( private router: ActivatedRoute,
               private spotify: SpotifyService) {
                this.loading = true;
    this.router.params.subscribe( params => {
      this.getArtist( params['id'] );
      this.getTopTracks( params['id'] );
    });
   }

   getArtist( id: string ) {
    this.spotify.getArtist( id )
      .subscribe( artist => {
        this.artist = artist;
      });
   }

   getTopTracks( id: string ) {
    this.spotify.getTopTracks( id )
    .subscribe( tracks => {
      console.log( tracks );
      this.topTracks = tracks;
      this.loading = false;
    });
   }

}
