import { Component, OnInit } from '@angular/core';
import { Product } from '../product-read/product.model';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { SupplierService } from '../../supplier/supplier.service';
import { Supplier } from '../../supplier/supplier-read/supplier.model';

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
  proCategoria: '',
  fornecedor: undefined  // <== o nome correto aqui
};

  fornecedores: Supplier[] = [];

  constructor(
    private productService: ProductService,
    private supplierService: SupplierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.supplierService.read().subscribe(fornecedores => {
      this.fornecedores = fornecedores;
    });
  }

  createProduct(): void {
    if (
      !this.product.proNome.trim() ||
      this.product.proPrecoCusto < 0 ||
      this.product.proPrecoVenda < 0 ||
      this.product.proQuantidade < 0 ||
      !this.product.proCodigoBarras.trim() ||
      !this.product.proMarca.trim() ||
      !this.product.proCategoria.trim() ||
      !this.product.fornecedor // validação da FK
    ) {
      this.productService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente!');
      return;
    }

    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Produto criado!');
      this.router.navigate(['/products']);
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
