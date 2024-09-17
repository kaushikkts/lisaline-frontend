import { Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {LoginComponent} from "./components/login/login.component";
import {ReviewCertificateComponent} from "./components/review-certificate/review-certificate.component";
import {authGuard} from "./guards/auth.guard";

export const routes: Routes = [
  {
    component: DashboardComponent,
    path: 'dashboard',
    canActivate: [authGuard]
  },
  {
    component: ReviewCertificateComponent,
    path: 'review-certificate',
    canActivate: [authGuard]

  },
  {
    component: LoginComponent,
    path: 'login',

  },
  {
    component: PageNotFoundComponent,
    path: '**'
  }
];
