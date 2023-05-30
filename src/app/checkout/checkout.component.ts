import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AddToCartService } from '../Services/add-to-cart.service';
import { StripeCardComponent } from 'ngx-stripe';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('cardElement') cardElement!: ElementRef;
  cardCaptureReady: any = false;
  invalidError: any;
  items: any[] = [];

  @ViewChild('stripeCard') stripeCard!: StripeCardComponent;
  cartItems: any;
  totalBalance: any;
  totalPrice: any=0;

  constructor(private stripeService: AddToCartService) {}

  ngOnInit(): void {
    this.getItem();
  }
  setStripeToken(token: any) {
    this.stripeService.getItem().subscribe((response) => {
      const totalPrice = response[0].totalPrice; // Get the total price from the response
  
      const data = {
        token: token.id,
        totalPrice: totalPrice, // Set the total price in the data object
      };
  
      this.stripeService.checkOut(data).subscribe((res: any) => {
        this.totalBalance = this.stripeService.getTotalBalance();
        this.totalBalance = res.item.totalPrice;
      });
    });
  }
  
  getItem(): void {
    this.stripeService.getItem().subscribe((response) => {
      this.totalBalance = response[0].totalPrice;
    });
  }
}
