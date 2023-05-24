import { Component } from '@angular/core';
import { AddToCartService } from '../Services/add-to-cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  constructor(private service: AddToCartService) {}
  ngOnInit(): void {}
  items: any[] = [
    {
      name: 'Bell Pepper',
      price: 120.0,
      discount: 30,
      image: '../../assets/images/product-1.jpg',
      rating: 4.5,
      heart: false,
    },
    {
      name: 'Strawberry',
      price: 120.0,
      discount: null,
      image: '../../assets/images/product-2.jpg',
      rating: 2.5,
      heart: true,
    },
    {
      name: 'Green Beans',
      price: 120.0,
      discount: null,
      image: '../../assets/images/product-3.jpg',
      rating: 2.5,
    },
    {
      name: 'Purple Cabbage',
      price: 120.0,
      discount: null,
      image: '../../assets/images/product-4.jpg',
      rating: 2.5,
      heart: true,
    },
    {
      name: 'Tomatoe',
      price: 30.0,
      discount: null,
      image: '../../assets/images/product-5.jpg',
      rating: 2.5,
      heart: true,
    },
    {
      name: 'Brocolli',
      price: 80.0,
      discount: null,
      image: '../../assets/images/product-6.jpg',
      rating: 2.5,
      heart: true,
    },
    {
      name: 'Carrots',
      price: 110.0,
      discount: null,
      image: '../../assets/images/product-7.jpg',
      rating: 2.5,
      heart: true,
    },
    {
      name: 'Fruit Juice',
      price: 250.0,
      discount: null,
      image: '../../assets/images/product-8.jpg',
      rating: 2.5,
      heart: true,
    },


    {
      name: 'Onion',
      price: 20.0,
      discount: null,
      image: '../../assets/images/product-9.jpg',
      rating: 2.5,
      heart: true,
    },


    {
      name: 'Apple',
      price: 250.0,
      discount: null,
      image: '../../assets/images/product-10.jpg',
      rating: 2.5,
      heart: true,
    },


    {
      name: 'Garlic',
      price: 350.0,
      discount: null,
      image: '../../assets/images/product-11.jpg',
      rating: 2.5,
      heart: true,
    },
    {
      name: 'Chilli',
      price: 90.0,
      discount: null,
      image: '../../assets/images/product-12.jpg',
      rating: 2.5,
      heart: true,
    },
  ];

  addToCart(item: any) {
    this.service.addItem(item).subscribe((response: any) => {
      console.log('Item added to cart', response);
      this.service.updateCartItemCount(); // Update cart item count after adding an item
      item.heart = !item.heart;
      item.rating = item.heart ? item.rating + 1 : item.rating - 1;
    });
  }

  calculateDiscountedPrice(price: number, discount: number): number {
    return price - (price * discount) / 100;
  }
}
