import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardModule} from '@carbon/icons-angular/lib';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DonationsComponent} from './donations/donations.component';
import {LoginComponent} from './auth/login/login.component';
import {SignUpComponent} from './auth/sign-up/sign-up.component';
import {AccountComponent} from './account/account.component';


const routes: Routes = [
  { path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  { path: 'main', component: DashboardComponent},
  { path: 'donations', component: DonationsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: SignUpComponent},
  { path: 'account', component: AccountComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
