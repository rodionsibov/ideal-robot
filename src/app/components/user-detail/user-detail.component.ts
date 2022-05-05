import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { CoordinateInterface } from 'src/app/interfaces/coordinate-interface';
import { ResponseInterface } from 'src/app/interfaces/response-interface';
import { UserService } from 'src/app/services/user.service';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

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
    //     .subscribe((response: any) => {
    //       console.log(response);
    //     });
    // });
    this.response$.subscribe({
      next: (res) => {
        this.loadMap(res.results[0].coordinate);
      },
      error: (err) => {
        console.log(err);
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
      view: new View({
        center: [coordinate.latitude, coordinate.longitude],
        zoom: 8,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
    });
  }
  
  
}
