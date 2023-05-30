import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  setPublishableKey(stripePublishableKey: any) {
    throw new Error('Method not implemented.');
  }
  elements: any;
  createToken(nativeElement: any): { token: any; error: any; } | PromiseLike<{ token: any; error: any; }> {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
