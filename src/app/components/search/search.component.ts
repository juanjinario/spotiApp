import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  artistas: any[] = [];
  loading: boolean;

  constructor(private spotify: SpotifyService) {
  }

  buscar(termino: string) {
    if (termino !== '') {
      this.loading = true;
      this.spotify.getArtists(termino)
      .subscribe( data => {
        this.artistas = data;
        this.loading = false;
      });
    }

  }

}
