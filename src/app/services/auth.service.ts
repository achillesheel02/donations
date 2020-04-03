import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private user: string;
  private userRole: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private timer: any;
  private userId: string;
  // tslint:disable-next-line:variable-name
  private login_error = false;

  constructor(private http: HttpClient,
              private router: Router) { }

  createUser(email: string, password: string, role: string) {
    const authData = { email, password, role};
    return this.http.post('http://localhost:3000/api/user/signup', authData);
  }

  resolveRole(role: string) {
    let route;
    switch (role) {
      case 'pharmacist':
        route = 'pharmacy';
        break;
      case 'doctor':
        route = 'doctor';
        break;
      case 'lab_tech':
        route = 'lab';
        break;
      case 'management':
        route = 'management';
        break;
      case 'receptionist':
        route = 'reception';
    }
    return route;
  }

  login(email: string, password: string) {
    const authData= { email, password};
    this.http.post<{token: string, email: string, role: string, id: string}>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        this.token = response.token;
        this.setAuthTimer(3600000);
        this.userRole = response.role;
        this.user = response.email;
        this.userId = response.id;
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + 3600000);
        this.saveAuthData(this.token, expirationDate, this.user, this.userRole, this.userId);
        this.router.navigate(['dashboard', this.resolveRole(this.userRole)]);
      }, error => {
        this.login_error = true;
      });
  }
  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) { return; }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    console.log(authInfo);
    if (expiresIn > 0) {
      this.token = authInfo._token;
      this.setAuthTimer(expiresIn);
      this.isAuthenticated = true;
      this.user = authInfo._user;
      this.userId = authInfo._id;
      this.userRole = authInfo._role;
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    this.timer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  logout() {
    this.token = null;
    clearTimeout(this.timer);
    this.isAuthenticated = false;
    this.userRole = null;
    this.user = null;
    this.clearAuthData();
    this.authStatusListener.next(false);
    this.router.navigate(['login']);
  }
  loginError() {
    return this.login_error;
  }
  getToken() {
    return this.token;
  }

  getUser() {
    return this.user;
  }
  getUserId() {
    return this.userId;
  }

  getRole() {
    return this.userRole;
  }

  isReceptionist() {
    return this.userRole === 'receptionist';
  }
  isManagement() {
    return this.userRole === 'management';
  }
  isLabTech() {
    return this.userRole === 'lab_tech';
  }
  isPharmacist() {
    return this.userRole === 'pharmacist';
  }
  isDoctor() {
    return this.userRole === 'doctor';
  }
  isAuth() {
    return this.isAuthenticated;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  private saveAuthData(token: string, expirationDate: Date, user: string, role: string, id:string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('user', user);
    localStorage.setItem('role', role);
    localStorage.setItem('id', id);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    const id = localStorage.getItem('id');
    if (!token || !expirationDate) { return; }
    return {
      _token: token,
      expirationDate: new Date(expirationDate),
      _user: user,
      _role: role,
      _id: id
    };
  }
}

