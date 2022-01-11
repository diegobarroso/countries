import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild,  } from '@angular/core';
// @ts-ignore
import createGlobe from 'cobe';

@Component({
  selector: 'app-cobe',
  templateUrl: './cobe.component.html',
  styles: ['']
})
export class CobeComponent implements OnInit, AfterViewInit {

  @ViewChild('cobe') cobe!: ElementRef<HTMLCanvasElement>;
  @Input('position') position!: number[];

  public context!: CanvasRenderingContext2D | null;
  public phi = 0;

  constructor() { }

  ngOnInit(): void {
    const globe = createGlobe(this.cobe, {
      devicePixelRatio: 2,
      width: 600,
      height: 600,
      phi: 0,
      theta: 0,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.48627450980392156, 0.30196078431372547, 1],
      //markerColor: [0.1568627450980392, 0.20784313725490197, 0.5764705882352941],
      markerColor: [1, 1, 1],
      glowColor: [0.1568627450980392, 0.20784313725490197, 0.5764705882352941],
      markers: [
        { location: [this.position[0], this.position[1]], size: 0.1 },
      ],
      onRender: (state: { phi: number; }) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = this.phi
        this.phi += 0.02
      },
    });
    
  }

  ngAfterViewInit(): void {
    this.context = this.cobe.nativeElement.getContext('2d');   
  }

}


