import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit{
    myForm: FormGroup;
    total: number;

    constructor(private slService: ShoppingListService) {}

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

    }
}