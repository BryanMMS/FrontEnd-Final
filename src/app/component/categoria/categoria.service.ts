import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from './categoria-read/categoria.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
baseUrl = "http://localhost:8080/categorias";
  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }


  showMessage(msg: string): void{
    this.snackBar.open(msg, 'X',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

   create(categorias: Categoria): Observable<Categoria>{
      return this.http.post<Categoria>(this.baseUrl, categorias)
    }
  
    read(): Observable<Categoria[]>{
      return this.http.get<Categoria[]>(this.baseUrl)
    }
  
    readById(ctgId: string): Observable<Categoria>{
      const url = `${this.baseUrl}/${ctgId}`
      return this.http.get<Categoria>(url)
    }
  
    update(categoria: Categoria): Observable<Categoria>{
      const url = `${this.baseUrl}/${categoria.ctgId}`
      return this.http.put<Categoria>(url,categoria)
    }
  
  
    delete(ctgId: number): Observable<Categoria>{
      const url = `${this.baseUrl}/${ctgId}`
      return this.http.delete<Categoria>(url)
    }
}
