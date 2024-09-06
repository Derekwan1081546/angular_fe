import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './signin/signin.component'; // 導入 SigninComponent
import { SignupComponent } from './sign_up/signup.component'; // 導入 SignupComponent
import { CommonModule } from '@angular/common'; // 導入 CommonModule，提供 NgIf 等指令
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true, // 
  imports: [RouterOutlet, SigninComponent, HttpClientModule, RouterModule, SignupComponent, CommonModule]
})
export class AppComponent {
  title = 'fev2';
  showSignInDropdown = true;  // 控制 SignIn 顯示
  showSignUpDropdown = false;  // 控制 SignUp 顯示

  handleToggleSignUpDropdown() {
    this.showSignInDropdown = false;
    this.showSignUpDropdown = true;  // 顯示 SignUp 表單
  }

  handleToggleSignInDropdown() {
    this.showSignInDropdown = true;
    this.showSignUpDropdown = false;  // 顯示 SignIn 表單
  }
}
