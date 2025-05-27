import { Component } from '@angular/core';
import { Product } from '../product-read/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent {
  product!: Product;

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.readById(id!).subscribe((product: Product) =>{
      this.product = product
    })
  }

  updateProduct(): void {
    // Verificação: nenhum campo pode estar vazio ou com valores inválidos
    if (
      !this.product.proNome.trim() ||
      this.product.proPrecoCusto < 0 ||
      this.product.proPrecoVenda < 0 ||
      this.product.proQuantidade < 0 ||
      !this.product.proDescricao.trim() ||
      !this.product.proCodigoBarras.trim() ||
      !this.product.proMarca.trim() ||
      !this.product.proCategoria.trim() ||
      (this.product.proAtivo !== true && this.product.proAtivo !== false) // validação para booleano proAtivo
    ) {
      this.productService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente!');
      return;
    }
    // Se passou na validação, prossegue com a atualização
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage('Produto atualizado com sucesso!');
      this.router.navigate(['/products']);
    });
  }
  cancel(): void {
    this.router.navigate(['/products']);
  }}