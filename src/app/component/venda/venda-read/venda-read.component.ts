import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';

import { VendaService } from '../venda.service';
import { Venda } from './venda.model';

@Component({
  selector: 'app-venda-read',
  templateUrl: './venda-read.component.html',
  styleUrls: ['./venda-read.component.css']
})
export class VendaReadComponent implements OnInit {
  vendas = new MatTableDataSource<Venda>();
  totalVendas: number = 0;

  displayedColumns: string[] = [
    'vndId',
    'cliente',
    'formaPagamento',
    'vndDataVenda',
    'vndTotal',
    'vndConcluida',
    'action'
  ];

  // Filtros para cliente e forma de pagamento
  filters = {
    cliente: '',
    formaPagamento: ''
  };

  constructor(private vendaService: VendaService) {}

  ngOnInit(): void {
    this.loadVendas();
  }

  /** Carrega todas as vendas e aplica o filtro personalizado */
  loadVendas(): void {
    this.vendaService.read().subscribe(vendas => {
      this.vendas.data = vendas;
      this.totalVendas = vendas.length;

      // Filtro personalizado
      this.vendas.filterPredicate = (data: Venda, filter: string) => {
        const clienteMatch = (data.cliente?.cliNome || '')
          .toLowerCase()
          .includes(this.filters.cliente.toLowerCase());

        const formaPgtoMatch = (data.formaPagamento?.fpgDescricao || '')
          .toLowerCase()
          .includes(this.filters.formaPagamento.toLowerCase());

        return clienteMatch && formaPgtoMatch;
      };
    });
  }

  /** Atualiza os filtros da tabela quando cliente ou pagamento mudar */
  onFilterChange(field: 'cliente' | 'formaPagamento', event: Event | MatSelectChange): void {
    const value = event instanceof MatSelectChange
      ? event.value || ''
      : (event.target as HTMLInputElement).value;

    this.filters[field] = value;

    // Força o MatTableDataSource a reaplicar os filtros
    this.vendas.filter = Math.random().toString();
    this.totalVendas = this.vendas.filteredData.length;
  }
}
