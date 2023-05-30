import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {
  public cartItemCountSubject: BehaviorSubject<number>;
  public cartItems: BehaviorSubject<any[]>;
  public totalBalanceKey = 'totalBalance';

  constructor(private http: HttpClient) {
    const storedCartItemCount = localStorage.getItem('cartItemCount');
    const initialCartItemCount = storedCartItemCount ? parseInt(storedCartItemCount, 10) : 0;
    this.cartItemCountSubject = new BehaviorSubject<number>(initialCartItemCount);

    const storedCartItems = localStorage.getItem('cartItems');
    const initialCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
    this.cartItems = new BehaviorSubject<any[]>(initialCartItems);
  }

  addItem(credentials: any): Observable<any> {
    const url = 'http://localhost:3000/add-item'; URL
    return this.http.post(url, credentials).pipe(
      tap(() => {
        this.updateCartItemCount();
      })
    );
  }

  getItem(): Observable<any[]> {
    const url = 'http://localhost:3000/get-item';
    return this.http.get<any[]>(url);
  }

  getCartItemCount(): Observable<number> {
    return this.cartItemCountSubject.asObservable();
  }

  removeItem(itemId: string): Observable<any> {
    const url = `http://localhost:3000/delete-item/${itemId}`;
    return this.http.delete(url).pipe(
      tap(() => {
        const updatedItems = this.cartItems.getValue().filter(item => item._id !== itemId);
        this.cartItems.next(updatedItems);
        this.updateCartItemCount();
      })
    );
  }

  updateCartItemCount() {
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
  checkOut(item: any): Observable<any> {
    const url = 'http://localhost:3000/checkout'; URL
    return this.http.post(url, item).pipe(
      tap(() => {
        this.updateCartItemCount();
      })
    );
  }

  updateCartItem(item: any): Observable<any> {
    const url = `http://localhost:3000/update-item/${item._id}`;
    return this.http.put(url, item).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.log('Item not found in cart');
        } else {
          console.log('An error occurred:', error.message);
        }
        throw error;
      })
    );
  }

  setTotalBalance(totalBalance: number): void {
    localStorage.setItem(this.totalBalanceKey, totalBalance.toString());
  }
  getTotalBalance(): number | null {
    const storedTotalBalance = localStorage.getItem(this.totalBalanceKey);
    return storedTotalBalance ? parseFloat(storedTotalBalance) : null;
  }
  subscribe(item: any): Observable<any> {
    const url = 'http://localhost:3000/subscribe'; URL
    return this.http.post(url, item).pipe();
  }
}
