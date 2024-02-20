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
  

  constructor(public route : ActivatedRoute, public data : SpotifyService) { }

  ngOnInit() {
    // 1 - On clique sur un [routerLink] dans le composant artist qui mène vers show/NOM_ARTISTE
    // 2- ce composant-ci obtient le nom de l'artiste dans la route
    // 3 - on lance la requête https://rest.bandsintown.com/artists/MON_ARTISTE/events?app_id=API_KEY avec le nom de l'Artiste reçu
    // 4- ???
    // 5 - profit
    this.nomArtist = this.route.snapshot.paramMap.get("nomArtist");
    if(this.nomArtist != undefined)
      this.data.searchShows(this.nomArtist);
    

  }
  async getShows(){

  }

}
