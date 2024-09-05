import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // 匯入 Router

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  disabled: boolean = false;
  inprogress: boolean = false;
  username: string = '';
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
    private router: Router  // 新增 Router
  ) {}

  ngOnInit() {
    this.username = this.service.getUsername();
    this.disabled = this.service.getValid();
    this.service.validObserver.subscribe((value) => {
      this.inprogress = false;
      this.disabled = value;
      this.username = this.service.getUsername();
    });
  }

  onSubmit() {
    this.inprogress = true;
    this.service.signUp(
      this.signUpForm.value.firstname!,
      this.signUpForm.value.lastname!,
      this.signUpForm.value.email!,
      this.signUpForm.value.password!,
      this.signUpForm.value.password_check!,
    )
  }
  
}
