import { Component } from '@angular/core';
import { Categoria } from './categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.css']
})
export class CategoriaReadComponent {
categorias!: Categoria[];
displayedColumns = ['ctgId', 'ctgNome', 'ctgDescricao', 'ctgAtivo', 'action'];

constructor(private categoriaService: CategoriaService){}

ngOnInit(): void{
  this.categoriaService.read().subscribe(categorias => {
    this.categorias = categorias;
    console.log(categorias);
  });
}

}
