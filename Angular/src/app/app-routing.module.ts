import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentDetailsListComponent } from './payment-details/payment-details-list/payment-details-list.component';
import { PaymentDetailComponent } from './payment-details/payment-detail/payment-detail.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'pay', component:  PaymentDetailsComponent},
  { path: 'user', component: UserComponent, 
      children: [
        { path: 'registration', component: RegistrationComponent },
        { path: 'login', component: LoginComponent }
      ]},
  { path: 'home', component:  HomeComponent, canActivate:[AuthGuard]},
  { path: '', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
