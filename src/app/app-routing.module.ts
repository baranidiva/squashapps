import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path: 'profile', pathMatch: 'full',component: ProfileComponent},
  {path: 'register', pathMatch: 'full',component: RegisterComponent},
  { path: '',  redirectTo: '/register', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
