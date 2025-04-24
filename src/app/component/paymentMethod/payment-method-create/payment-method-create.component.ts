import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from '../payment-method-read/paymentMethod.model';
import { PaymentMethodService } from '../payment-method.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-method-create',
  templateUrl: './payment-method-create.component.html',
  styleUrls: ['./payment-method-create.component.css']
})
export class PaymentMethodCreateComponent implements OnInit{
paymentMethod: PaymentMethod={
description: '',
type: '',
stats: ''
}

constructor(private paymentMethodService: PaymentMethodService,
  private router:Router){}

  ngOnInit(): void {
      
  }

  createPaymentMethod(): void{
    this.paymentMethodService.create(this.paymentMethod).subscribe(()=>{
      this.paymentMethodService.showMessage('Forma de pagamento criada')
      this.router.navigate(['/paymentMethods'])
    })
  }

  cancel(): void{
    this.router.navigate(['/paymentMethods'])
  }
}
