import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, Subject, throwIfEmpty } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static readonly SIGNIN = 'http://107.22.189.28/api/v2/auth/signin';

  private username: string = '';
  private valid: boolean = false;
  private token: string = 'cd';

  validObserver: Subject<boolean> = new Subject();
  tokenObserver: Subject<string> = new Subject();

  constructor(private readonly http: HttpClient) {
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
  }
}
