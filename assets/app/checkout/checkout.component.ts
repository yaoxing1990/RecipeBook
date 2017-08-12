import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Customer} from '../shared/customer.model';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, Response} from '@angular/http';
import {ErrorService} from '../errors/error.service';
//declare var Stripe: any;

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit{
    //stripe = Stripe('pk_test_PNTNeymss5PzNqblVNnS85fe');
    message: string;
    stripeToken: any;
    myForm: FormGroup;
    total: number;

    constructor(private slService: ShoppingListService,
                private http: Http,
                private errorService: ErrorService) {}

    ngOnInit() {
        this.total = this.slService.totalPrice;
        this.myForm = new FormGroup({
           name: new FormControl(null, Validators.required),
            address: new FormControl(null, Validators.required),
            card_name: new FormControl(null, Validators.required),
            card_number: new FormControl(null, Validators.required),
            card_expire_month: new FormControl(null, Validators.required),
            card_expire_year: new FormControl(null, Validators.required),
            card_cvc: new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        //console.log("Paid!");
        this.message = 'Loading...';
        (<any>window).Stripe.card.createToken({
            number: this.myForm.value.card_number,
            cvc: this.myForm.value.card_cvc,
            exp_month: this.myForm.value.card_expire_month,
            exp_year: this.myForm.value.card_expire_year,
            name: this.myForm.value.name
        }, (status, response) => {
            if(response.err) {
                console.log(response.error.message);
            } else {
                const customer = new Customer(this.myForm.value.name, this.total, this.myForm.value.address, response.id);
                const body = JSON.stringify(customer);
                const headers = new Headers({'Content-Type': 'application/json'});
                return this.http.post('http://angular2deployment-env.rryzmkhw72.us-east-2.elasticbeanstalk.com/checkout', body, {headers: headers})
                //return this.http.post('http://localhost:3000/checkout', body, {headers: headers})
                    .map((response: Response) => {
                        response.json();
                        console.log(response.toString());
                    })
                    .catch((error: Response) => {
                        this.errorService.handleError(error.json());
                        return Observable.throw(error.json());
                    })
                    .subscribe(
                        (res) => {
                            alert("Thanks for your purchase!");
                        }
                    );
            }
        });

    }

    // stripeResponseHandler(status, response) {
    //     if(response.err) {
    //         //console.log(response.error.message);
    //     } else {
    //         //console.log(response.id);
    //         return response.id;
    //     }
    // }

}