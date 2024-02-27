import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/data.service';
import { album } from '../model/album';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  artistId : string | null = null;
  listAlbums : album[] = [];
  artistName : string | null = null;

  constructor(public route : ActivatedRoute, public data : SpotifyService) { }

  async ngOnInit() {
    this.artistId = this.route.snapshot.paramMap.get("idArtist");
    this.data.connect();
    if(this.artistId != undefined){
      this.listAlbums = await this.data.getAlbums(this.artistId);
    }
    this.artistName = sessionStorage.getItem("artistName");
  }
}
