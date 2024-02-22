import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Artist } from '../model/artist';
import { lastValueFrom } from 'rxjs';
import { show } from '../model/show';
import { Data } from '@angular/router';

const CLIENT_ID : string = "b5ab92f30c1546b7b57f108b9d871bcc";
const CLIENT_SECRET : string = "0a54a3b296124daeb2a507833622c2c7";
const googleApiKey = "AIzaSyBiiIi-GVR1Ky8Sdo0JxZjjZ61JBhlmXUU";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyToken : string | null = null;
  artistChercher ?: Artist;

  constructor(public http : HttpClient) { }

  async connect(): Promise<void> {
      let body = new HttpParams().set('grant_type', 'client_credentials');
      let httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        })
      };
      let x = await lastValueFrom(this.http.post<any>('https://accounts.spotify.com/api/token', body.toString(), httpOptions));
      console.log(x);
      this.spotifyToken = x.access_token;
  }

  async searchArtist(artist : string): Promise<Artist> {
    const httpOptions = { headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer ' + this.spotifyToken
    })};
    
    let x = await lastValueFrom(this.http.get<any>('https://api.spotify.com/v1/search?type=artist&offset=0&limit=1&q=' + artist, httpOptions));
    console.log(x);
    let a : Artist =  new Artist(x.artists.items[0].id, x.artists.items[0].name, x.artists.items[0].images[0].url);
    console.log("Artiste : ", a);
    return a;
  }

  async searchVideoId(searchText : string) : Promise<string>{
    // Requête pour obtenir l'Id d'une vidéo YouTube ici ! Utilisez le paramètre searchText.

    // Remplacez ce return par l'id de la vidéo obtenue.
    let id = await lastValueFrom(this.http.get<any>("https://www.googleapis.com/youtube/v3/search?type=video&part=id&maxResults=1&key="+ googleApiKey + "&q="+ searchText));
    return id.items[0].id.videoId;
  }
  async searchShows(artistName : string) : Promise<show[]>{

    if(artistName != null)
    {
      let s = await lastValueFrom(this.http.get<any>("https://rest.bandsintown.com/artists/"+artistName+"/events?app_id=2b32475766802ac01eefda45e9e42ea0"));
      console.log(s);
      const shows: show[] = [];
      for(let e of s){
        shows.push(new show(e.venue.city, e.venue.country, e.starts_at, parseFloat(e.venue.latitude), parseFloat(e.venue.longitude)));
      }
      return shows;
    }
    return [];
  }
}
