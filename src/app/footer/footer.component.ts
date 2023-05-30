import { Component, OnInit } from '@angular/core';
import { AddToCartService } from '../Services/add-to-cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  submitted = false;
  error: any;
   emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  sub: any;
  subscriberForm: FormGroup;
  constructor(private service: AddToCartService, private fb: FormBuilder) {
    this.subscriberForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    });
  }

  ngOnInit(): void {

  }
  subscribeEmail(form: any) {
    this.submitted = true;
    if (form.status === "INVALID") return;
    this.service.subscribe(form.controls.email.value).subscribe(

      (res: any) => {
        console.log(res, "form:::::::::::::::::::::::::::::::::::::::")

        this.error = 'Subscribed Successfully';
      },
      (err) => {
        this.error = err.error.message;
      }
    );

  }
}
