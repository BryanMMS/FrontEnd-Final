import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/component/product/product.service';
import { VendaService } from 'src/app/component/venda/venda.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  qtdProdutos: number = 0;
  qtdVendas: number = 0;
  qtdPendentes: number = 0;

  constructor(
    private productService: ProductService,
    private vendaService: VendaService
  ) {}

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.qtdProdutos = products.length;
    });

    this.vendaService.read().subscribe(vendas => {
      const vendasConcluidas = vendas.filter(v => v.vndConcluida);
      const vendasPendentes = vendas.filter(v => !v.vndConcluida);

      this.qtdVendas = vendasConcluidas.length;
      this.qtdPendentes = vendasPendentes.length;


    });
  }
}
