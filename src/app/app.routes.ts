import { Routes } from '@angular/router';
import { ModelExamplePageComponent } from './model-example-page/model-example-page.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'model-examples',
    component: ModelExamplePageComponent,
    canActivate: [authGuard],
  },
];
