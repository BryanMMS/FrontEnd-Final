import { Component } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../cliente-read/cliente.model';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent {
cliente!: Cliente;

constructor(private clienteService: ClienteService,
  private router: Router,
  private route: ActivatedRoute){}


  ngOnInit(): void{
    const id = this.route.snapshot.paramMap.get('id')
    this.clienteService.readById(id!).subscribe((cliente: Cliente)=>{
      this.cliente = cliente
    })
  }

updateCliente(): void {
  if (
    !this.cliente.cliNome.trim() ||
  !this.cliente.cliCpf?.trim() ||
   this.cliente.cliCpf.length !== 14 ||
    !this.cliente.conEmail.trim() ||
    !this.cliente.conTelefoneComercial.trim() ||
    !this.cliente.endRua.trim() ||
    !this.cliente.endNumero.trim() ||
    !this.cliente.endCidade.trim() ||
    !this.cliente.endCep.trim() ||
    !this.cliente.endEstado.trim()
  ) {
    this.clienteService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente!');
    return;
  }

  this.clienteService.update(this.cliente).subscribe(() => {
    this.clienteService.showMessage('Cliente atualizado com sucesso!');
    this.router.navigate(['/clientes']);
  });
}

  cancel(): void {
    this.router.navigate(['/clientes']);
  }
}
