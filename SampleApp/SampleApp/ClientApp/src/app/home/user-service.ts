import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from './user-model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    }


    saveUser(userModel: UserModel) : Observable<UserModel[]>{
        return  <Observable<UserModel[]>> this.http.post(this.baseUrl + 'api/user', userModel, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        });
    }
}
