import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentMethod } from './payment-method-read/paymentMethod.model';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
baseUrl = "http://localhost:3001/paymentMethods"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }


  showMessage(msg: string): void{
    this.snackBar.open(msg, 'X',{
      duration: 300,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(paymentMethods: PaymentMethod): Observable<PaymentMethod>{
    return this.http.post<PaymentMethod>(this.baseUrl, paymentMethods)
  }

  read(): Observable<PaymentMethod[]>{
    return this.http.get<PaymentMethod[]>(this.baseUrl)
  }

  readById(id: string): Observable<PaymentMethod>{
    const url = `${this.baseUrl}/${id}`
    return this.http.get<PaymentMethod>(url)
  }

  update(paymentMethod: PaymentMethod): Observable<PaymentMethod>{
    const url = `${this.baseUrl}/${paymentMethod}`
    return this.http.put<PaymentMethod>(url,paymentMethod)
  }


  delete(id: number): Observable<PaymentMethod>{
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<PaymentMethod>(url)
  }
  
}
