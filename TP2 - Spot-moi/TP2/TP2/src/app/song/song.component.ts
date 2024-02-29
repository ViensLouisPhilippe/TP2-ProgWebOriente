import { Component, OnInit } from '@angular/core';
import { song } from '../model/song';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../services/data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const youtubeURL = "https://www.youtube.com/embed/";
@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
  albumId : string | null = null;
  Songs : song[] = [];
  videoSearchText : string = "";
  videoId : string = "";
  videoUrl ?: SafeResourceUrl;
  albumName : string | null = null;

  constructor(public route : ActivatedRoute, public data : SpotifyService, public sanitizer : DomSanitizer) { }

  async ngOnInit() {
    this.albumId = this.route.snapshot.paramMap.get("idAlbum");
    this.data.connect();
    if(this.albumId != undefined){
      this.Songs = await this.data.getSongs(this.albumId);
    }
    this.albumName = sessionStorage.getItem("albumName");
  }
  async searchVideo(songName : string, artistName : string): Promise<void>{
    this.videoId = await this.data.getVideoId(songName + " " + artistName);
    console.log(songName + " " + artistName);
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeURL + this.videoId);

  }
}
