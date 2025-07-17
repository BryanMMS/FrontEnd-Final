import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { VendaService } from '../venda.service';
import { ClienteService } from '../../cliente/cliente.service';
import { FuncionarioService } from '../../funcionario/funcionario.service';
import { PaymentMethodService } from '../../paymentMethod/payment-method.service';
import { ProductService } from '../../product/product.service';

import { Venda } from '../venda-read/venda.model';
import { Cliente } from '../../cliente/cliente-read/cliente.model';
import { Funcionario } from '../../funcionario/funcionario-read/funcionario.model';
import { PaymentMethod } from '../../paymentMethod/payment-method-read/paymentMethod.model';
import { ItemVenda } from '../venda-read/itemVenda.model';
import { Product } from '../../product/product-read/product.model';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-venda-update',
  templateUrl: './venda-update.component.html',
  styleUrls: ['./venda-update.component.css']
})
export class VendaUpdateComponent implements OnInit {

  venda: Venda = {
    cliente: undefined!,
    funcionario: undefined!,
    formaPagamento: undefined!,
    vndDataVenda: new Date(),
    vndTotal: 0,
    vndConcluida: false,
    vndObservacao: '',
    itens: []
  };

  clientes: Cliente[] = [];
  funcionarios: Funcionario[] = [];
  formasPagamento: PaymentMethod[] = [];
  produtos: Product[] = [];

  itemColumns = ['produto', 'quantidade', 'precoUnitario', 'subtotal', 'action'];

  totalVenda: number = 0;

  constructor(
    private vendaService: VendaService,
    private clienteService: ClienteService,
    private funcionarioService: FuncionarioService,
    private paymentMethodService: PaymentMethodService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Carregue todas as listas em paralelo e só depois carregue a venda
    forkJoin({
      clientes: this.clienteService.read(),
      funcionarios: this.funcionarioService.read(),
      formasPagamento: this.paymentMethodService.read(),
      produtos: this.productService.read()
    }).subscribe(({ clientes, funcionarios, formasPagamento, produtos }) => {
      this.clientes = clientes;
      this.funcionarios = funcionarios;
      this.formasPagamento = formasPagamento;
      this.produtos = produtos;

      // Agora sim, carrega a venda para edição
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.vendaService.readById(id).subscribe(venda => {
          this.venda = venda;

          // Linkar cliente, funcionario e formaPagamento da venda com os objetos carregados para que os selects mostrem o valor selecionado
          this.venda.cliente = this.clientes.find(c => c.cliId === this.venda.cliente.cliId) || this.venda.cliente;
          this.venda.funcionario = this.funcionarios.find(f => f.funId === this.venda.funcionario.funId) || this.venda.funcionario;
          this.venda.formaPagamento = this.formasPagamento.find(f => f.fpgId === this.venda.formaPagamento.fpgId) || this.venda.formaPagamento;

          // Para cada item, linkar o produto com o objeto da lista de produtos para o select funcionar
          this.venda.itens = this.venda.itens.map(item => {
            item.produto = this.produtos.find(p => p.proId === item.produto.proId) || item.produto;
            return item;
          });

          // Atualizar subtotais e total
          this.venda.itens.forEach((_, i) => this.updateItemSubtotal(i));
        });
      }
    });
  }

  addItem(): void {
    const novoItem: ItemVenda = {
      produto: undefined!,
      ivdQuantidade: 1,
      ivdPrecoUnitario: 0,
      ivdSubtotal: 0
    };
    this.venda.itens = [...this.venda.itens, novoItem];
  }

  removeItem(index: number): void {
    this.venda.itens = this.venda.itens.filter((_, i) => i !== index);
    this.calculateTotal();
  }

  updateItemSubtotal(index: number): void {
    const item = this.venda.itens[index];
    if (!item) return;

    if (item.produto) {
      item.ivdPrecoUnitario = item.produto.proPrecoVenda;
      item.ivdSubtotal = item.ivdPrecoUnitario * item.ivdQuantidade;
    } else {
      item.ivdPrecoUnitario = 0;
      item.ivdSubtotal = 0;
    }
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalVenda = this.venda.itens.reduce((sum, item) => sum + (item.ivdSubtotal || 0), 0);
    this.venda.vndTotal = this.totalVenda;
  }

  // Método para preparar o objeto para enviar no update, garantindo só IDs dos relacionamentos
  prepareVendaForUpdate(): Venda {
    return {
      ...this.venda,
      cliente: { cliId: this.venda.cliente.cliId } as Cliente,
      funcionario: { funId: this.venda.funcionario.funId } as Funcionario,
      formaPagamento: { fpgId: this.venda.formaPagamento.fpgId } as PaymentMethod,
      itens: this.venda.itens.map(item => ({
        produto: { proId: item.produto.proId } as Product,
        ivdQuantidade: item.ivdQuantidade,
        ivdPrecoUnitario: item.ivdPrecoUnitario,
        ivdSubtotal: item.ivdSubtotal
      }))
    };
  }

  updateVenda(): void {
    if (!this.venda.cliente || !this.venda.funcionario || !this.venda.formaPagamento || this.venda.itens.length === 0) {
      alert('Preencha todos os campos obrigatórios e adicione pelo menos um item.');
      return;
    }

    for (const item of this.venda.itens) {
      if (!item.produto || item.ivdQuantidade <= 0) {
        alert('Itens inválidos. Verifique produtos e quantidades.');
        return;
      }
    }

    this.calculateTotal();

    const vendaParaEnviar = this.prepareVendaForUpdate();

    this.vendaService.update(vendaParaEnviar).subscribe({
      next: () => {
        alert('Venda atualizada com sucesso!');
        this.router.navigate(['/vendas']);
      },
      error: (err) => {
        console.error('Erro ao atualizar venda:', err);
        alert('Erro ao atualizar venda');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/vendas']);
  }

}
  