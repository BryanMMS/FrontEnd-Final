import { Component, OnInit } from '@angular/core';
import { Product } from '../product-read/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { MarcaService } from '../../marca/marca.service';
import { Marca } from '../../marca/marca-read/marca.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  product!: Product;
  marcas: Marca[] = [];

  // variável para controlar o select da marca (apenas o id)
  selectedMarcaId!: number;

  constructor(
    private productService: ProductService,
    private marcaService: MarcaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.productService.readById(id!).subscribe((product: Product) => {
      this.product = product;

      // inicializa selectedMarcaId com o id da marca do produto, se existir
      this.selectedMarcaId = product.marca?.marId || 0;
    });

    this.marcaService.read().subscribe((dados: Marca[]) => {
      this.marcas = dados;
    });
  }

  updateProduct(): void {
    // Atribui o objeto Marca selecionado para o produto, com base no selectedMarcaId
    const marcaSelecionada = this.marcas.find(m => m.marId === this.selectedMarcaId);
    if (!marcaSelecionada) {
      this.productService.showMessage('Marca inválida!');
      return;
    }
    this.product.marca = marcaSelecionada;

    // Validações
    if (
      !this.product.proNome.trim() ||
      this.product.proPrecoCusto < 0 ||
      this.product.proPrecoVenda < 0 ||
      this.product.proQuantidade < 0 ||
      !this.product.proCodigoBarras.trim() ||
      !this.product.marca ||
      !this.product.proCategoria.trim() ||
      (this.product.proAtivo !== true && this.product.proAtivo !== false)
    ) {
      this.productService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente!');
      return;
    }

    // Atualiza produto
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage('Produto atualizado com sucesso!');
      this.router.navigate(['/products']);
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
