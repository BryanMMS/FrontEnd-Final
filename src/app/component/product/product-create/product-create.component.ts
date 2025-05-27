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
  product: Product = {
    proNome: '',
    proPrecoCusto: 0,
    proPrecoVenda: 0,
    proQuantidade: 0,
    proDescricao: '',
    proCodigoBarras: '',
    proMarca: '',
    proAtivo: false,
    proDataCadastro: new Date(),
    proDataAtualizacao: new Date(),
    proCategoria: ''
  };

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    // Inicialização, se necessário
  }

  createProduct(): void {
    // Verificação: nenhum campo pode estar vazio ou com valores inválidos
    if (
      !this.product.proNome.trim() ||
      this.product.proPrecoCusto < 0 ||
      this.product.proPrecoVenda < 0 ||
      this.product.proQuantidade < 0 ||
      !this.product.proDescricao.trim() ||
      !this.product.proCodigoBarras.trim() ||
      !this.product.proMarca.trim() ||
      !this.product.proCategoria.trim()
    ) {
      this.productService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente!');
      return;
    }

    // Se passou na validação, prossegue com o cadastro
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Produto criado!');
      this.router.navigate(['/products']);
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
