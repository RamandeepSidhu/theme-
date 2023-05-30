import { Component } from '@angular/core';
import { AddToCartService } from '../Services/add-to-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items: any[] = [];
  checkOutData: any[] = [];
  customerName: string = '';
  totalPrice: number = 0;
  discount: number = 0;
  totalBalance: any;
  constructor(private service: AddToCartService) { }

  ngOnInit(): void {
    this.getItems('data');
    this.checkOut();
    this.calculateTotalPrice();
    this.calculateTotalQuantity();
    this.totalBalance = this.service.getTotalBalance();
  }


  removeItem(itemId: string): void {
    this.service.removeItem(itemId).subscribe(
      (response: any) => {
        console.log('Item removed from cart', response);
        this.items = this.items.filter(item => item._id !== itemId);
      },
      (error: any) => {
        console.error('Error removing item from cart', error);
      }
    );
  }



getItems(index: any): void {
  this.service.getItem().subscribe((res: any) => {
    this.items = res;
    this.totalPrice=res.totalPrice
    this.service.setTotalBalance(this.totalPrice);

    this.calculateTotalPrice();
    for (const item of this.items) {
      item.quantity = 1;
    }
  });
}

checkOut(): void {
  const itemToCheckout: any = {
    customerName: this.customerName,
    totalPrice: this.totalPrice,
    items: this.items,
    discount: this.discount
  };

  this.service.checkOut(itemToCheckout).subscribe((res: any) => {
    this.checkOutData = res;
  });
}

calculateTotalPrice(): void {
  this.totalPrice = 0;
  for (const item of this.items) {
    if (item.price && item.quantity) {
      this.totalPrice += item.price * item.quantity;
    }
  }
}

calculateTotalQuantity(): number {
  let totalQuantity = 0;
  for (const item of this.items) {
    totalQuantity += item.quantity;
  }
  return totalQuantity;
}

calculateDiscount(): void {
  // Add your discount calculation logic here
  // Assign the discount amount to this.discount
}

decrementQuantity(item: any): void {
  if (item.quantity > 1) {
    item.quantity--;
    this.calculateTotalPrice();
    this.updateCartItem(item); // Call the API to update the item's quantity
  }
}

incrementQuantity(item: any): void {
  if (item.quantity < 100) {
    item.quantity++;
    this.calculateTotalPrice();
    this.updateCartItem(item); // Call the API to update the item's quantity
  }
}

updateCartItem(item: any): void {
  // Call your API endpoint to update the item's quantity
  this.service.updateCartItem(item).subscribe((response) => {
    // this.totalBalance = this.service.getTotalBalance();
    this.totalBalance=response.totalPrice
  });
  
}
}