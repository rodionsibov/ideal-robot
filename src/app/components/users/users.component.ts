import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { ResponseInterface } from 'src/app/interfaces/response-interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  // response!: ResponseInterface
  response$: Observable<ResponseInterface>;

  constructor(private userService: UserService) {
    this.response$ = this.userService.getUsers(15).pipe(
      // tap((val) => console.log(val)),
      shareReplay(1)
    );
  }

  ngOnInit(): void {
    // this.userService.getUsers(15).subscribe((results: any) => {
    //   this.response = results
    // });
  }
}
