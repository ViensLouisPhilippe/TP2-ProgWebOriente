import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';
import { SongComponent } from './song/song.component';
import { ShowComponent } from './show/show.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [				
    AppComponent,
      ArtistComponent,
      AlbumComponent,
      SongComponent,
      ShowComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:"", redirectTo: "/artist", pathMatch:"full"},
      {path:"artist", component:ArtistComponent},
      {path:"album", component:AlbumComponent},
      {path:"show", component:ShowComponent},
      {path:"show/:nomArtist", component:ShowComponent},
      {path:"song", component:SongComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
