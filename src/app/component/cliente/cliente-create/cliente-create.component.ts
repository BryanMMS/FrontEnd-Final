import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente-read/cliente.model';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    cliNome: '',
    cliCpf: '',

    conCelular: '',
    conTelefoneComercial: '',
    conEmail: '',

    endRua: '',
    endNumero: '',
    endCidade: '',
    endCep: '',
    endEstado: ''
  }
  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {}

  createCliente(): void {
    const c = this.cliente;

    if (!c.cliNome.trim() ||  !this.cliente.cliCpf?.trim() || this.cliente.cliCpf.length !== 14 || !c.conCelular.trim() || !c.conEmail.trim() ||
        !c.endRua.trim() || !c.endNumero.trim() || !c.endCidade.trim() || !c.endCep.trim() || !c.endEstado.trim()) {
      this.clienteService.showMessage('Por favor, preencha todos os campos corretamente!');
      return;
    }

    this.clienteService.create(this.cliente).subscribe(() => {
      this.clienteService.showMessage('Cliente criado com sucesso!');
      this.router.navigate(['/clientes']);
    });
  }

  cancel(): void {
    this.router.navigate(['/clientes']);
  }
}
