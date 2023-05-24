import { Component } from '@angular/core';
import { AddToCartService } from '../Services/add-to-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private cartService: AddToCartService) { }
  getCartItemCount(): Observable<number> {
    return this.cartService.cartItemCountSubject.asObservable();
  }
  
}
