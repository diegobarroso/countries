import { Component, Input, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styles: [`
    #map {
      width: 90vw;
      height: 100vh;
      margin: 0 auto;
    }
  `]
})
export class MapComponent implements OnInit {

  @Input('position') position!: number[];

  constructor() { }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;
    const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [this.position[1], this.position[0]], // starting position [lng, lat]
    zoom: 4 // starting zoom
    });
  }

}
