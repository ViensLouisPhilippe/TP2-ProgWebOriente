import { HttpClient } from '@angular/common/http';
import { Artist } from './../model/artist';
import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { SpotifyService } from '../services/data.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artist ?: Artist;
  jsonData : string | null = null;
  nomArtist : string = "";
  listArtists : Artist[] = [];
  

  constructor(public httpClient : HttpClient, public data : SpotifyService) { }

  ngOnInit() {
    this.data.connect();

  }
  async getArtist(){
    this.artist = await this.data.searchArtist(this.nomArtist);
    this.listArtists.push(this.artist)
  }
}
