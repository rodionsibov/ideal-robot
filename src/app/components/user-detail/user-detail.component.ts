import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, shareReplay, switchMap, tap } from 'rxjs';
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
    //     .subscribe((response: any) => {
    //       console.log(response);
    //     });
    // });
  }

  changeMode(mode?: 'edit' | 'locked'): void {
    console.warn(mode);
    this.mode = this.mode === 'locked' ? 'edit' : 'locked';
    this.buttonText = this.buttonText === 'Edit' ? 'Save Changes' : 'Edit';
    if (mode === 'edit') {
      // logic to update the user on the back end
      console.log('Updating using on the back end');
    }
  }
}
