import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cargo } from './cargo-read/cargo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargoFuncService {
baseUrl = "http://localhost:8080/cargosfunc";
  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }


  showMessage(msg: string): void{
    this.snackBar.open(msg, 'X',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

   create(cargos: Cargo): Observable<Cargo>{
      return this.http.post<Cargo>(this.baseUrl, cargos)
    }
  
    read(): Observable<Cargo[]>{
      return this.http.get<Cargo[]>(this.baseUrl)
    }
  
    readById(carId: string): Observable<Cargo>{
      const url = `${this.baseUrl}/${carId}`
      return this.http.get<Cargo>(url)
    }
  
    update(cargo: Cargo): Observable<Cargo>{
      const url = `${this.baseUrl}/${cargo.carId}`
      return this.http.put<Cargo>(url,cargo)
    }
  
  
    delete(carId: number): Observable<Cargo>{
      const url = `${this.baseUrl}/${carId}`
      return this.http.delete<Cargo>(url)
    }
    
  }