import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventpageComponent } from './eventpage/eventpage.component';
import { FormComponent } from './form/form.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'home', component: HomeComponent },
  { path: 'eventpage', component: EventpageComponent },
  { path: 'form', component: FormComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' }, // Wildcard route for 404
];
