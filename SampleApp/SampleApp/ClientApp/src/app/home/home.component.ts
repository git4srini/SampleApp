import { Component, Inject } from '@angular/core';
import { UserService } from './user-service';


@Component({
  selector: 'app-home',
    templateUrl: './home.component.html',
    providers: []
})
export class HomeComponent {
    formData: User = new User();
    userList: any[] = [];
    isInvalidData: boolean = false;

    constructor(private userSvc: UserService) {
        //http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
        //    this.forecasts = result;
        //}, error => console.error(error));
    }

    onSave() {
        if (this.formData.firstName === undefined ||
            this.formData.lastName === undefined ||
            this.formData.firstName.trim() === ""
            || this.formData.lastName.trim() === "") {
            this.isInvalidData = true;
        } else {
            this.userSvc.saveUser(this.formData).subscribe(data => {
                this.userList = data;
            });
        }
    }

    clear() {
        this.formData = new User();
    }
}

export class User {
    firstName: string;
    lastName: string;
}
