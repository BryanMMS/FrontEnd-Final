import { Component } from '@angular/core';
import { Categoria } from '../categoria-read/categoria.model';
import { CategoriaService } from '../categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent {
  categoria!: Categoria;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const ctgId = this.route.snapshot.paramMap.get('ctgId');
    this.categoriaService.readById(ctgId!).subscribe(categoria =>{
      this.categoria = categoria
    })
  }

  deleteCategoria(): void {
    this.categoriaService.delete(this.categoria.ctgId!).subscribe(() =>{
    this.categoriaService.showMessage('Categoria excluido com sucesso!')  
    this.router.navigate(['/categorias'])
    })
  }

  cancel(): void{
    this.router.navigate(['/categorias'])
  }
}
