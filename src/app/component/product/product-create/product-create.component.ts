import { Router } from "@angular/router";
import { MarcaService } from "../../marca/marca.service";
import { SupplierService } from "../../supplier/supplier.service";
import { ProductService } from "../product.service";
import { Supplier } from "../../supplier/supplier-read/supplier.model";
import { Product } from "../product-read/product.model";
import { Component, OnInit } from "@angular/core";
import { Marca } from "../../marca/marca-read/marca.model";
import { Categoria } from "../../categoria/categoria-read/categoria.model";
import { CategoriaService } from "../../categoria/categoria.service";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product: Product =
   {
    proNome: '',
    proPrecoCusto: 0,
    proPrecoVenda: 0,
    proQuantidade: 0,
    proDescricao: '',
    proCodigoBarras: '',
    proAtivo: true,
    proDataCadastro: new Date(),
    proDataAtualizacao: undefined,
    categoria: undefined,
    fornecedor: undefined,
    marca: undefined
    
  };

  fornecedores: Supplier[] = [];
  marcas: Marca[] = [];
  categorias: Categoria[] = [];
  

  constructor(
    private productService: ProductService,
    private supplierService: SupplierService,
    private marcaService: MarcaService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

ngOnInit(): void {
  
  this.product.proCodigoBarras = this.gerarCodigoBarras();

  this.marcaService.read().subscribe(dados => {
    this.marcas = dados.filter(marca => marca.marAtivo); // Apenas marcas ativas
  });

  this.categoriaService.read().subscribe(dados => {
    this.categorias = dados.filter(categoria => categoria.ctgAtivo); // Apenas categorias ativas
  });
    this.supplierService.read().subscribe(dados => {
    this.fornecedores = dados.filter(supplier => supplier.forAtivo); // Apenas fornecedores ativas
  });
}

gerarCodigoBarras(): string {
  const codigo = Math.floor(Math.random() * 10000000000000).toString();  // Gera um número aleatório de 13 dígitos
  return codigo.padStart(13, '0');  // Preenche com 0 à esquerda, se necessário, para ter exatamente 13 dígitos
}

  createProduct(): void {
    if (
      !this.product.proNome.trim() ||
      this.product.proPrecoCusto < 0 ||
      this.product.proPrecoVenda < 0 ||
      this.product.proQuantidade < 0 ||
      !this.product.proCodigoBarras.trim() ||
      !this.product.categoria || 
      !this.product.fornecedor ||
      !this.product.marca ||
          !this.product.categoria.ctgAtivo ||         // Verifica se categoria está ativa
            !this.product.fornecedor.forAtivo ||  
    !this.product.marca.marAtivo 
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

    apenasLetras(event: KeyboardEvent): void {
  const charCode = event.key;
  const regex = /^[A-Za-zÀ-ÿ\s]*$/;

  if (!regex.test(charCode)) {
    event.preventDefault();
  }
}

bloquearPaste(event: ClipboardEvent): void {
  const texto = event.clipboardData?.getData('text') || '';
  const regex = /^[A-Za-zÀ-ÿ\s]*$/;
  if (!regex.test(texto)) {
    event.preventDefault();
  }
}


apenasNumeros(event: KeyboardEvent): void {
  const charCode = event.key;
  const regex = /^[0-9]$/;

  if (!regex.test(charCode)) {
    event.preventDefault();
  }
}

bloquearPasteNumeros(event: ClipboardEvent): void {
  const texto = event.clipboardData?.getData('text') || '';
  const regex = /^[0-9]+$/;
  if (!regex.test(texto)) {
    event.preventDefault();
  }
}
}
