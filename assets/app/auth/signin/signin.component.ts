import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

import { AuthService } from '../auth.service';
import {User} from '../user.model';
import {Router} from '@angular/router';
import {RecipeService} from '../../recipes/recipe.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

    myForm: FormGroup;

    constructor(private authService: AuthService,
                private router: Router,
                private recipeService: RecipeService) { }

    ngOnInit() {
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        const user = new User(this.myForm.value.email, this.myForm.value.password);
        this.authService.signinUser(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    this.recipeService.currentUser = data.username;
                    console.log(data.username);
                    this.router.navigateByUrl('/');
                },
                error => console.log(error)
            );
        this.myForm.reset();
    }

}
