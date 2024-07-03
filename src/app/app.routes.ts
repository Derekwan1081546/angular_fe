import { Routes } from '@angular/router';
import { ModelExamplePageComponent } from './model-example-page/model-example-page.component';
import { authGuard } from './auth/auth.guard';
import { ModelExampleFormComponent } from './model-example-form/model-example-form.component';

export const routes: Routes = [
  {
    path: 'model-examples',
    component: ModelExamplePageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'model-examples/:model',
    component: ModelExampleFormComponent,
    canActivate: [authGuard],
  },
];
