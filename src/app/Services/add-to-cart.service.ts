import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {
  public cartItemCountSubject: BehaviorSubject<number>;
  public cartItems: BehaviorSubject<any[]>;

  constructor(private http: HttpClient) {
    const storedCartItemCount = localStorage.getItem('cartItemCount');
    const initialCartItemCount = storedCartItemCount ? parseInt(storedCartItemCount, 10) : 0;
    this.cartItemCountSubject = new BehaviorSubject<number>(initialCartItemCount);

    const storedCartItems = localStorage.getItem('cartItems');
    const initialCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
    this.cartItems = new BehaviorSubject<any[]>(initialCartItems);
  }

  addItem(credentials: any): Observable<any> {
    const url = 'http://localhost:3000/add-item'; // Replace with your API endpoint URL
    return this.http.post(url, credentials).pipe(
      tap(() => {
        this.updateCartItemCount(); // Update the cart item count after adding an item
      })
    );
  }

  getItem(): Observable<any[]> {
    const url = 'http://localhost:3000/get-item'; // Replace with your API endpoint URL
    return this.http.get<any[]>(url);
  }

  getCartItemCount(): Observable<number> {
    return this.cartItemCountSubject.asObservable();
  }
  
  removeItem(itemId: string): Observable<any> {
    const url = `http://localhost:3000/delete-item/${itemId}`; // Replace with your API endpoint URL
    return this.http.delete(url).pipe(
      tap(() => {
        const updatedItems = this.cartItems.getValue().filter(item => item._id !== itemId);
        this.cartItems.next(updatedItems);
        this.updateCartItemCount(); // Update the cart item count after removing an item
      })
    );
  }
  
  updateCartItemCount() {
    // Retrieve the latest cart items from the server and update the cart item count
    this.getItem().pipe(
      tap((items: any[]) => {
        const cartItemCount = items.length;
        this.cartItemCountSubject.next(cartItemCount);
        localStorage.setItem('cartItemCount', cartItemCount.toString());
      })
    ).subscribe({
      error: (error) => {
        console.error('Failed to retrieve cart items', error);
      }
    });
  }
}
