import {User} from './user.model';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, Response} from '@angular/http';
import {ErrorService} from '../errors/error.service';

@Injectable()
export class AuthService {
    token: string;

    constructor(private http: Http, private errorService: ErrorService) {}
    
    signupUser(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://angular2deployment-env.rryzmkhw72.us-east-2.elasticbeanstalk.com/user', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    signinUser(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://angular2deployment-env.rryzmkhw72.us-east-2.elasticbeanstalk.com/user/signin', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    logout() {
        localStorage.clear();
    }


     isAuthenticated() {
         return localStorage.getItem('token') !== null;
     }
}