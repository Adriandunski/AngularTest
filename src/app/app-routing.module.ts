import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_helpers/auth.guard';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  { path: 'addCustomer', loadChildren: () => import('./add-customer/add-customer.module').then(m => m.AddCustomerModule),
    canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'addUser', loadChildren: () => import('./add-user/add-user.module').then(m => m.AddUserModule), canActivate: [AuthGuard]},
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule), canActivate: [AuthGuard]},
  { path: 'branch', loadChildren: () => import('./branch/branch.module').then(m => m.BranchModule), canActivate: [AuthGuard]},
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard]},
  // tslint:disable-next-line:max-line-length
  { path: 'myBranch/:login', loadChildren: () => import('./my-branch/my-branch.module').then(m => m.MyBranchModule), canActivate: [AuthGuard]},
  { path: 'addPolicy', loadChildren: () => import('./add-policy/add-policy.module').then(m => m.AddPolicyModule), canActivate: [AuthGuard] },
  { path: 'policies', loadChildren: () => import('./policy/policy.module').then(m => m.PolicyModule), canActivate: [AuthGuard]},
  { path: 'calendar', loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule), canActivate: [AuthGuard]}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
