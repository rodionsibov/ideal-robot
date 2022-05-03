import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'user/:uuid',
    component: UserDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
