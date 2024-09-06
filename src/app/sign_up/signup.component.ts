import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @Input() showDropdown2: boolean = false;  // 控制 SignUp 表單顯示
  @Output() toggleSignInDropdown = new EventEmitter<void>();  // 發送事件給父元件，切換到 SignIn

  disabled: boolean = false;
  inprogress: boolean = false;
  signUpForm = this.formBuilder.group({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password_check: new FormControl(''),
  });

  constructor(
    private service: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.disabled = this.service.getValid();
    this.service.validObserver.subscribe((value) => {
      this.inprogress = false;
      this.disabled = value;
    });
  }

  async onSubmit() {
    this.inprogress = true;
    try {
      await this.service.signUp(
        this.signUpForm.value.firstname!,
        this.signUpForm.value.lastname!,
        this.signUpForm.value.email!,
        this.signUpForm.value.password!,
        this.signUpForm.value.password_check!
      );

      // 註冊成功後觸發登入表單顯示
      this.toggleSignInDropdown.emit(); 
    } catch (error) {
      console.error('Signup failed', error);
    } finally {
      this.inprogress = false;
    }
  }
}
