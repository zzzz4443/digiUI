import {Subject} from 'rxjs';

import {Injectable} from '@angular/core';

import { User } from './user.model';
import { AuthData } from './auth-date.model';

import{Router} from '@angular/router';



@Injectable()
export class AuthService {

    authChange = new Subject<boolean>();

    private user: User;

    constructor(private router: Router) {}

    registerUser(authData: AuthData){
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };

        this.authSuccess();
      
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        
        this.authSuccess();
    }

    logout() {
        this.user = null;
        this.authChange.next(false);

        this.router.navigate(['/login']);
    }

    getUser() {
        return {...this.user};
    }

    isAuth() {
        return this.user != null;
    }

    private authSuccess() {
        this.authChange.next(true);

        this.router.navigate(['/checkout']);
    }
}