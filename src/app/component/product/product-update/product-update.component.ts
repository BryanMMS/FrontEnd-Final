import { Component, OnInit } from '@angular/core';
import { Product } from '../product-read/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { MarcaService } from '../../marca/marca.service';
import { Marca } from '../../marca/marca-read/marca.model';
import { Supplier } from '../../supplier/supplier-read/supplier.model';
import { SupplierService } from '../../supplier/supplier.service';
import { Categoria } from '../../categoria/categoria-read/categoria.model';
import { CategoriaService } from '../../categoria/categoria.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  product!: Product;
  marcas: Marca[] = [];
  fornecedores: Supplier[] = [];
  categorias: Categoria[] = [];

  // variável para controlar o select da marca (apenas o id)
  selectedMarcaId!: number;
selectedFornecedorId!: number;
selectedCategoriaId!: number;
  

  constructor(
    private productService: ProductService,
    private marcaService: MarcaService,
    private supplierService: SupplierService,
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.productService.readById(id!).subscribe((product: Product) => {
      this.product = product;

      // inicializa selectedMarcaId com o id da marca do produto, se existir
      this.selectedMarcaId = product.marca?.marId || 0;
            // inicializa selectedFornecedorId com o id do fornecedor do produto, se existir
      this.selectedFornecedorId = product.fornecedor?.forId || 0;
         // inicializa selectedCategoriaId com o id da categoria do produto, se existir
          this.selectedCategoriaId = product.categoria?.ctgId || 0;
    });

   this.marcaService.read().subscribe((dados: Marca[]) => {
  this.marcas = dados.filter(marca => marca.marAtivo); // apenas marcas ativas
});

this.categoriaService.read().subscribe((dados: Categoria[]) => {
  this.categorias = dados.filter(categoria => categoria.ctgAtivo); // apenas categorias ativas
});


       this.supplierService.read().subscribe((dados: Supplier[]) => {
      this.fornecedores = dados;
    });

    const marcaSelecionada = this.marcas.find(m => m.marId === this.selectedMarcaId);
if (!marcaSelecionada || !marcaSelecionada.marAtivo) {
  this.productService.showMessage('Marca inválida ou inativa!');
  return;
}

const categoriaSelecionado = this.categorias.find(c => c.ctgId === this.selectedCategoriaId);
if (!categoriaSelecionado || !categoriaSelecionado.ctgAtivo) {
  this.productService.showMessage('Categoria inválida ou inativa!');
  return;
}

  }

  
updateProduct(): void {
  // Atribui o objeto Marca selecionado
  const marcaSelecionada = this.marcas.find(m => m.marId === this.selectedMarcaId);
  if (!marcaSelecionada) {
    this.productService.showMessage('Marca inválida!');
    return;
  }
  this.product.marca = marcaSelecionada;

  // Atribui o objeto Fornecedor selecionado
  const fornecedorSelecionado = this.fornecedores.find(f => f.forId === this.selectedFornecedorId);
  if (!fornecedorSelecionado) {
    this.productService.showMessage('Fornecedor inválido!');
    return;
  }
  this.product.fornecedor = fornecedorSelecionado;



    // Atribui o objeto Categoria selecionado
  const categoriaSelecionado = this.categorias.find(c => c.ctgId === this.selectedCategoriaId);
  if (!categoriaSelecionado) {
    this.productService.showMessage('Categoria inválido!');
    return;
  }
  this.product.categoria = categoriaSelecionado;


// ----------------------------------------------------------------------------------------------------------

  // Validações
  if (
    !this.product.proNome.trim() ||
    this.product.proPrecoCusto < 0 ||
    this.product.proPrecoVenda < 0 ||
    this.product.proQuantidade < 0 ||
    !this.product.proCodigoBarras.trim() ||
    !this.product.marca ||
    !this.product.fornecedor || // <- agora também exige fornecedor
     !this.product.categoria ||
    (this.product.proAtivo !== true && this.product.proAtivo !== false)
  ) {
    this.productService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente!');
    return;
  }


  this.product.proDataAtualizacao = new Date();

  // Atualiza produto
  this.productService.update(this.product).subscribe(() => {
    this.productService.showMessage('Produto atualizado com sucesso!');
    this.router.navigate(['/products']);
  });
}

cancel(): void {
  this.router.navigate(['/products']);
}

// ----------------------------------------------------------------------------------------------------------
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
