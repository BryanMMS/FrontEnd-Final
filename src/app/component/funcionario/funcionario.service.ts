import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Funcionario } from './funcionario-read/funcionario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  baseUrl = "http://localhost:8080/funcionarios"; // URL base da API
  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }


    /** Exibe uma mensagem de notificação. */
    showMessage(msg: string): void {
      this.snackBar.open(msg, 'X', {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top"
      });
    }


    create(funcionario: Funcionario): Observable<Funcionario>{
      return this.http.post<Funcionario>(this.baseUrl, funcionario)
    }
  
    read(): Observable<Funcionario[]>{
      return this.http.get<Funcionario[]>(this.baseUrl)
    }
   
    readById(funId: string): Observable<Funcionario>{
      const url = `${this.baseUrl}/${funId}`
      return this.http.get<Funcionario>(url)
    }
  
    update(funcionario: Funcionario): Observable<Funcionario>{
      const url = `${this.baseUrl}/${funcionario.funId}`
      return this.http.put<Funcionario>(url, funcionario)
    }
  
  
    delete(funId: number): Observable<Funcionario>{
      const url = `${this.baseUrl}/${funId}`
      return this.http.delete<Funcionario>(url)
    }
  
}
