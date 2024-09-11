import { Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {LoginComponent} from "./components/login/login.component";
import {ReviewCertificateComponent} from "./components/review-certificate/review-certificate.component";

export const routes: Routes = [
  {
    component: DashboardComponent,
    path: ''
  },
  {
    component: ReviewCertificateComponent,
    path: 'review-certificate'
  },
  {
    component: LoginComponent,
    path: 'login'
  },
  {
    component: PageNotFoundComponent,
    path: '**'
  }
];
