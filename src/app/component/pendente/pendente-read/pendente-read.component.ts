import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';

import { VendaService } from '../../venda/venda.service';
import { Venda } from '../../venda/venda-read/venda.model';  

@Component({
  selector: 'app-pendente-read',
  templateUrl: './pendente-read.component.html',
  styleUrls: ['./pendente-read.component.css']
})
export class PendenteReadComponent implements OnInit {
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

  // Filtros para cliente, formaPagamento e data
  filters = {
    cliente: '',
    formaPagamento: '',
    vndDataVenda: ''
    // não precisa filtrar concluída porque será fixo 'false' para pendentes
  };

  constructor(private vendaService: VendaService) {}

  ngOnInit(): void {
    this.loadPendentes();
  }

  loadPendentes(): void {
    this.vendaService.read().subscribe(vendas => {
      // Filtra só os pendentes (não concluídos)
      const pendentes = vendas.filter(v => v.vndConcluida === false);

      this.vendas.data = pendentes;
      this.totalVendas = pendentes.length;

      this.vendas.filterPredicate = (data: Venda, filter: string) => {
        const clienteMatch = (data.cliente?.cliNome || '')
          .toLowerCase()
          .includes(this.filters.cliente.toLowerCase());

        const formaPgtoMatch = (data.formaPagamento?.fpgDescricao || '')
          .toLowerCase()
          .includes(this.filters.formaPagamento.toLowerCase());

        // filtro data
        let dataVendaStr = '';
        if (data.vndDataVenda) {
          const d = new Date(data.vndDataVenda);
          const day = ('0' + d.getDate()).slice(-2);
          const month = ('0' + (d.getMonth() + 1)).slice(-2);
          const year = d.getFullYear();
          dataVendaStr = `${day}/${month}/${year}`;
        }

        const dataVendaMatch = dataVendaStr.includes(this.filters.vndDataVenda);

        return clienteMatch && formaPgtoMatch && dataVendaMatch;
      };
    });
  }

  onFilterChange(field: 'cliente' | 'formaPagamento' | 'vndDataVenda', event: Event | MatSelectChange): void {
    const value = event instanceof MatSelectChange
      ? event.value || ''
      : (event.target as HTMLInputElement).value;

    this.filters[field] = value;

    this.vendas.filter = Math.random().toString();
    this.totalVendas = this.vendas.filteredData.length;
  }
}
