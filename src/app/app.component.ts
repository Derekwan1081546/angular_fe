import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './sign_up/signup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SigninComponent, HttpClientModule, RouterModule, SignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'fev2';
}
