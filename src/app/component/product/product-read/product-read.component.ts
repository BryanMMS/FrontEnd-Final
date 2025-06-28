import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from './product.model';

/**
 * Componente responsável pela leitura e exibição da lista de produtos.
 */
@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent {
  // Array que armazenará os produtos lidos
  products!: Product[];

  // Colunas a serem exibidas na tabela
  displayedColumns = ['proId', 'proNome', 'proPrecoCusto', 'proPrecoVenda','proCategoria','proQuantidade','proMarca','proAtivo','fornecedor', 'action'];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Chama o serviço para ler os produtos e armazena o resultado
    this.productService.read().subscribe(products => {
      this.products = products;
      console.log(products);  // Log dos produtos lidos para depuração
    });
  }
}

