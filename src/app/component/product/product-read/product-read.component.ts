import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from './product.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';
@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {
  products!: MatTableDataSource<Product>;
  displayedColumns = ['proId', 'proNome', 'proPrecoVenda', 'categoria', 'proQuantidade', 'marca', 'proAtivo', 'fornecedor', 'action'];

  // armazenar os filtros de cada campo
  filters = {
    nome: '',
    categoria: '',
    marca: '',
    ativo: ''
  };

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = new MatTableDataSource(products);

      this.products.filterPredicate = (data: Product, filter: string) => {
        // filter é ignorado, pois vamos usar os filtros da variável filters

        // verifica se cada filtro está contido no respectivo campo (tudo em lowercase para evitar case sensitive)
        const nomeMatch = data.proNome.toLowerCase().includes(this.filters.nome.toLowerCase());
        const categoriaMatch = (data.categoria?.ctgNome || '').toLowerCase().includes(this.filters.categoria.toLowerCase());
        const marcaMatch = (data.marca?.marNome || '').toLowerCase().includes(this.filters.marca.toLowerCase());
        const ativoStr = data.proAtivo ? 'sim' : 'não';
        const ativoMatch = ativoStr.includes(this.filters.ativo.toLowerCase());

        // retornar true só se todos os filtros baterem
        return nomeMatch && categoriaMatch && marcaMatch && ativoMatch;
      };
    });
  }
  onFilterChange(field: 'nome' | 'categoria' | 'marca' | 'ativo', event: Event | MatSelectChange) {
    let value: string;
  
    if (event instanceof MatSelectChange) {
      value = event.value;
    } else {
      value = (event.target as HTMLInputElement).value;
    }
  
    this.filters[field] = value;
    this.products.filter = '' + Math.random(); // força atualização do filtro
  }
}
