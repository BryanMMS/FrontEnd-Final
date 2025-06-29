import { Router } from "@angular/router";
import { MarcaService } from "../../marca/marca.service";
import { SupplierService } from "../../supplier/supplier.service";
import { ProductService } from "../product.service";
import { Supplier } from "../../supplier/supplier-read/supplier.model";
import { Product } from "../product-read/product.model";
import { Component, OnInit } from "@angular/core";
import { Marca } from "../../marca/marca-read/marca.model";

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
    proAtivo: true,
    proDataCadastro: new Date(),
    proDataAtualizacao: new Date(),
    proCategoria: '',
    fornecedor: undefined,
    marca: undefined
  };

  fornecedores: Supplier[] = [];
  marcas: Marca[] = [];

  constructor(
    private productService: ProductService,
    private supplierService: SupplierService,
    private marcaService: MarcaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.supplierService.read().subscribe(fornecedores => {
      this.fornecedores = fornecedores;
    });

    this.marcaService.read().subscribe(dados => {
      this.marcas = dados;
    });
  }

  createProduct(): void {
    if (
      !this.product.proNome.trim() ||
      this.product.proPrecoCusto < 0 ||
      this.product.proPrecoVenda < 0 ||
      this.product.proQuantidade < 0 ||
      !this.product.proCodigoBarras.trim() ||
      !this.product.proCategoria.trim() ||
      !this.product.fornecedor ||
      !this.product.marca
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
