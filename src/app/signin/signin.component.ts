import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent implements OnInit {
  disabled: boolean = false;
  inprogress: boolean = false;
  username: string = '';
  signInForm = this.formBuilder.group({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private service: AuthService, private formBuilder: FormBuilder) {}

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
    this.service.signIn(
      this.signInForm.value.username!,
      this.signInForm.value.email!,
      this.signInForm.value.password!
    );
  }

  signOut() {
    this.service.signOut();
  }
}
