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
    //
    this.jsonData = localStorage.getItem("listArtists");
    if(this.jsonData != null)
    {
      this.listArtists= JSON.parse(this.jsonData);
    }
    this.data.connect();

  }
  async getArtist(){

    this.artist = await this.data.searchArtist(this.nomArtist);
    let dejaLa : boolean = false;
    for(let e of this.listArtists){
      if(e.id == this.artist.id){
        dejaLa = true;
        break;
      }
    }
    if(!dejaLa) this.listArtists.push(this.artist);

    // modifier local
    this.saveListArtist()
  }
  async emptyListArtists()
  {
    this.listArtists = [];
    this.saveListArtist
  }
  async saveListArtist(){
    localStorage.setItem("listArtists", JSON.stringify(this.listArtists));
  }
}
