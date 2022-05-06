import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import { delay, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { CoordinateInterface } from 'src/app/interfaces/coordinate-interface';
import { ResponseInterface } from 'src/app/interfaces/response-interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  response$: Observable<ResponseInterface>;
  mode: 'edit' | 'locked' = 'locked';
  buttonText: 'Save Changes' | 'Edit' = 'Edit';

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.response$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        // console.warn(params.get('uuid')!);
        return this.userService.getUser(params.get('uuid')!);
      }),
      tap((val) => console.log(val)),
      shareReplay(1)
    );
  }

  ngOnInit(): void {
    // this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
    //   this.userService
    //     .getUser(params.get('uuid')!)
    //     .subscribe((response: ResponseInterface) => {
    //       console.log(response);
    //     });
    // });
    this.response$.pipe(delay(1000)).subscribe({
      next: (res) => {
        this.loadMap(res.results[0].coordinate);
      },
    });
  }

  changeMode(mode?: 'edit' | 'locked'): void {
    this.mode = this.mode === 'locked' ? 'edit' : 'locked';
    this.buttonText = this.buttonText === 'Edit' ? 'Save Changes' : 'Edit';
    if (mode === 'edit') {
      // logic to update the user on the back end
      console.log('Updating using on the back end');
    }
  }

  loadMap(coordinate: CoordinateInterface): void {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [
              new Feature({
                geometry: new Point([
                  coordinate.latitude,
                  coordinate.longitude,
                ]),
              }),
            ],
          }),
        }),
      ],
      view: new View({
        center: [coordinate.latitude, coordinate.longitude],
        zoom: 4,
      }),
    });
    console.log(map.getView().getCenter());
  }
}
