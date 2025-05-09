import { Component, OnInit } from '@angular/core';
import { Product } from '../product-read/product.model';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

/**
 * Componente para criação de novos produtos.
 */
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  // Objeto que representa um produto com valores padrão
  product: Product = {
    proNome: '',
    proPrecoCusto: 0,
    proPrecoVenda: 0,
    proQuantidade: 0, 
    proDescricao: ''
  }

  constructor(private productService: ProductService, private router: Router) { }
 
  ngOnInit(): void {
    // Inicialização do componente (sem lógica adicional no momento)
  }

  /**
   * Cria um novo produto e navega para a lista de produtos.
   */
  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Produto criado!');
      this.router.navigate(['/products']);
    });
  }

  /**
   * Cancela a operação e navega de volta para a lista de produtos.
   */
  cancel(): void {
    this.router.navigate(['/products']);
  }
}