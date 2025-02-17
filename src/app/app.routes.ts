import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventpageComponent } from './eventpage/eventpage.component';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'home', component: HomeComponent },
  { path: 'eventpage', component: EventpageComponent },
  { path: 'form', component: FormComponent },
  { path: '**', redirectTo: '' }, // Wildcard route for 404
];
