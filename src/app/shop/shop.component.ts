import { Component } from '@angular/core';
import { AddToCartService } from '../Services/add-to-cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  constructor(private service: AddToCartService) { }
  ngOnInit(): void { }
  items: any[] = [
    {
      name: 'Bell Pepper',
      price: 120.0,
      discount: 30,
      image: '../../assets/images/product-1.jpg',
      rating: 4.5,
      totalPrice: '',
      quantity: ''
    },
    {
      name: 'Strawberry',
      price: 120.0,
      discount: null,
      image: '../../assets/images/product-2.jpg',
      rating: 2.5,
      totalPrice: '',
      quantity: ''
    },
    {
      name: 'Green Beans',
      price: 120.0,
      discount: null,
      image: '../../assets/images/product-3.jpg',
      rating: 2.5,
      quantity: ''
    },
    {
      name: 'Purple Cabbage',
      price: 120.0,
      discount: null,
      image: '../../assets/images/product-4.jpg',
      rating: 2.5,
      totalPrice: '',
      quantity: ''
    },
    {
      name: 'Tomatoe',
      price: 30.0,
      discount: null,
      image: '../../assets/images/product-5.jpg',
      rating: 2.5,
      totalPrice: '',
      quantity: ''
    },
    {
      name: 'Brocolli',
      price: 80.0,
      discount: null,
      image: '../../assets/images/product-6.jpg',
      rating: 2.5,
      totalPrice: '',
      quantity: ''
    },
    {
      name: 'Carrots',
      price: 110.0,
      discount: null,
      image: '../../assets/images/product-7.jpg',
      rating: 2.5,
      totalPrice: '',
      quantity: ''
    },
    {
      name: 'Fruit Juice',
      price: 250.0,
      discount: null,
      image: '../../assets/images/product-8.jpg',
      rating: 2.5,
      totalPrice: '',
      quantity: ''
    },


    {
      name: 'Onion',
      price: 20.0,
      discount: null,
      image: '../../assets/images/product-9.jpg',
      rating: 2.5,
      totalPrice: '',
      quantity: ''
    },


    {
      name: 'Apple',
      price: 250.0,
      discount: null,
      image: '../../assets/images/product-10.jpg',
      rating: 2.5,
      totalPrice: '',
      quantity: ''
    },


    {
      name: 'Garlic',
      price: 350.0,
      discount: null,
      image: '../../assets/images/product-11.jpg',
      rating: 2.5,
      quantity: '',
      totalPrice: '',
    },
    {
      name: 'Chilli',
      price: 90.0,
      discount: null,
      image: '../../assets/images/product-12.jpg',
      rating: 2.5,
      totalPrice: '',
      quantity: ''
    },
  ];

  addToCart(item: any) {
    this.service.addItem(item).subscribe((response: any) => {
      console.log('Item added to cart', response);
      this.service.updateCartItemCount(); // Update cart item count after adding an item
      item.totalPrice = !item.totalPrice;
    });
  }

  calculateDiscountedPrice(price: number, discount: number): number {
    return price - (price * discount) / 100;
  }
}
