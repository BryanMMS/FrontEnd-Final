import { Component } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente } from './cliente.model';

@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.css']
})
export class ClienteReadComponent {
 clientes!: Cliente[];

 displayedColumns = ['cliId', 'cliNome', 'cliEmail', 'cliCpf', 'cliTelefone', 'cliEndereco', 'action'];

 constructor(private clienteService: ClienteService){}

 ngOnInit(): void {
  this.clienteService.read().subscribe(clientes => {
    this.clientes = clientes;
    console.log(clientes);
  });
 }
}
