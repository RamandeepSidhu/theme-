import { Component, OnInit } from '@angular/core';
import { AddToCartService } from '../Services/add-to-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private service: AddToCartService) { }
  ngOnInit(): void { }
  items: any[] = [
    {
      name: 'Bell Pepper',
      price: 120.0,
      discount: 30,
      image: '../../assets/images/product-1.jpg',
      rating: 4.5,
      quantity:''

    },
    {
      name: 'Strawberry',
      price: 120.0,
      discount: null,
      image: '../../assets/images/product-2.jpg',
      rating: 2.5,
    },
    {
      name: 'Green Beans',
      price: 120.0,
      discount: null,
      image: '../../assets/images/product-3.jpg',
      rating: 2.5,
      quantity:''
    },
    {
      name: 'Purple Cabbage',
      price: 120.0,
      discount: null,
      image: '../../assets/images/product-4.jpg',
      rating: 2.5,
      quantity:''
    },
    {
      name: 'Tomatoe',
      price: 30.0,
      discount: null,
      image: '../../assets/images/product-5.jpg',
      rating: 2.5,
      quantity:''
    },
    {
      name: 'Brocolli',
      price: 80.0,
      discount: null,
      image: '../../assets/images/product-6.jpg',
      rating: 2.5,
      quantity:''
    },
    {
      name: 'Carrots',
      price: 110.0,
      discount: null,
      image: '../../assets/images/product-7.jpg',
      rating: 2.5,
      quantity:''
    },
    {
      name: 'Fruit Juice',
      price: 250.0,
      discount: null,
      image: '../../assets/images/product-8.jpg',
      rating: 2.5,
      quantity:''
    },


    {
      name: 'Onion',
      price: 20.0,
      discount: null,
      image: '../../assets/images/product-9.jpg',
      rating: 2.5,
      quantity:''
    },


    {
      name: 'Apple',
      price: 250.0,
      discount: null,
      image: '../../assets/images/product-10.jpg',
      rating: 2.5,
      quantity:''
    },


    {
      name: 'Garlic',
      price: 350.0,
      discount: null,
      image: '../../assets/images/product-11.jpg',
      rating: 2.5,
      quantity:''
    },
    {
      name: 'Chilli',
      price: 90.0,
      discount: null,
      image: '../../assets/images/product-12.jpg',
      rating: 2.5,
      quantity:''
    },
  ];

  addToCart(item: any) {
    this.service.addItem(item).subscribe((response) => {
      console.log('Item added to cart', response);
      this.service.updateCartItemCount();
      // Calculate total price and quantity
      let totalPrice = 0;
      let totalQuantity = 0;

      for (const cartItem of this.items) {
        if (cartItem.name === item.name) {
          totalPrice += cartItem.price;
          totalQuantity++;
        }
      }

    });
  }

  calculateDiscountedPrice(price: number, discount: number): number {
    return price - (price * discount) / 100;
  }
}
