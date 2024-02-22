import { Component, OnInit } from '@angular/core';
import { show } from '../model/show';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../services/data.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  center : google.maps.LatLngLiteral = {lat: 42, lng: -4};
  zoom : number = 2;
  showsList : show[] = [];
  nomArtist : string | null = null;
  markerPosition : google.maps.LatLngLiteral[] = [];

  constructor(public route : ActivatedRoute, public data : SpotifyService) { }

  async ngOnInit() {
    this.nomArtist = this.route.snapshot.paramMap.get("nomArtist");
    if(this.nomArtist != undefined)
    {
      this.showsList = await this.data.searchShows(this.nomArtist);
      this.getShowsMarkers();
    }


  }
  async getShowsMarkers(){
    for(let e of this.showsList){
      this.markerPosition.push({lat : e.lat, lng : e.lng}); 
    }
  }

}
