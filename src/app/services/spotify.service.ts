import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Servicio de Spotify activado');
  }

  getQuery( query: string ) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQDH-4Uc53zb2Do_ZvrNjmEIAPU07uBJIdgefgHda6KSrEjQ3rX92Ubd2GOPXUwcTeZHWIpuyhwve_BREP4'
    });
    return this.http.get(url, {headers});
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20')
      .pipe( map( data => {
          return data['albums'].items;
      }));
  }

  getArtists(termino: string) {
    return this.getQuery(`search?q=${ termino }&type=artist&limit=20`)
    .pipe( map( data => data['artists'].items));
  }

  getArtist(id: string) {
    return this.getQuery(`artists/${ id }`);
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
        .pipe( map( data => data['tracks']) );
  }
}
