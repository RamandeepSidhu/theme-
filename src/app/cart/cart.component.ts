import { Component } from '@angular/core';
import { AddToCartService } from '../Services/add-to-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items: any[] = [];

  constructor(private service: AddToCartService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.service.getItem().subscribe((res: any) => {
      this.items = res; // Assign the response data to the items array
    })
  }
  removeItem(itemId: string): void {
    this.service.removeItem(itemId).subscribe(
      (response: any) => {
        console.log('Item removed from cart', response);
  
        // Update the frontend state
        this.items = this.items.filter(item => item._id !== itemId);
      },
      (error: any) => {
        console.error('Error removing item from cart', error);
  
        // Handle the error if necessary
      }
    );
  }
  
  
  
}