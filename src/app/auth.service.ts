import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, Subject, throwIfEmpty } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static readonly SIGNIN = 'http://bev2loadbalancer-61644974.us-east-1.elb.amazonaws.com/api/v2/auth/signin';
  private static readonly SIGNUP = 'http://bev2loadbalancer-61644974.us-east-1.elb.amazonaws.com/api/v2/auth/signup';

  private username: string = '';
  private valid: boolean = false;
  private token: string = 'cd';

  validObserver: Subject<boolean> = new Subject();
  tokenObserver: Subject<string> = new Subject();

  constructor(private readonly http: HttpClient, private router: Router) {
    this.tokenObserver.subscribe((value) => {
      this.token = value;
    });
    this.validObserver.subscribe((value) => {
      this.valid = value;
    });
  }

  getToken(): string {
    return this.token;
  }

  getUsername(): string {
    return this.username;
  }

  getValid(): boolean {
    return this.valid;
  }

  signIn(username: string, email: string, password: string) {
    this.username = username;
    const data = JSON.stringify({
      username: username,
      email: email,
      password: password,
    });
    this.http
      .post(AuthService.SIGNIN, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json',
        },
        responseType: 'text',
        reportProgress: true,
        observe: 'events',
      })
      .pipe()
      .subscribe((event) => {
        if (event.type == HttpEventType.Response) {
          if (event.ok) {
            const rsp = JSON.parse(event.body!);
            if (rsp['err']) {
              this.username = '';
              this.validObserver.next(false);
              this.tokenObserver.next('');
              return;
            }
            this.tokenObserver.next(rsp['token']);
            this.validObserver.next(true);
            // 傳遞 role 資訊
            console.log(rsp); // 確認 rsp 是否包含 role
            // 將 role 保存到 localStorage
            localStorage.setItem('role', rsp['role']);
            this.router.navigate(['/model-examples']);
          } else {
            this.validObserver.next(false);
          }
        }
      });
  }

  signUp(firstname: string, lastname: string, email: string, password: string, password_check: string) {
    const data = JSON.stringify({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      password_check: password_check,
      role: "normal_user",
    });
    this.http
      .post(AuthService.SIGNUP, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json',
        },
        responseType: 'text',
        reportProgress: true,
        observe: 'events',
      })
      .pipe()
      .subscribe((event) => {
        if (event.type == HttpEventType.Response) {
          if (event.ok) {
            const rsp = JSON.parse(event.body!);
            if (rsp['err']) {
              this.validObserver.next(false);
              this.tokenObserver.next('');
              return;
            }
            // this.tokenObserver.next(rsp['token']);
            // this.validObserver.next(true);
            // 成功之後導航到 signin component
            // 成功註冊後觸發 signin 按鈕
            
          } else {
            this.validObserver.next(false);
          }
        }
      });
  }
  
  
  
  signOut() {
    this.username = '';
    this.token = '';
    this.validObserver.next(false);
    // 導航回主頁面
    this.router.navigate(['/']);
  }
}
