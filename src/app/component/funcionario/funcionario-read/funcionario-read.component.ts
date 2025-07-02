import { Component } from '@angular/core';
import { FuncionarioService } from '../funcionario.service';
import { Funcionario } from './funcionario.model';

@Component({
  selector: 'app-funcionario-read',
  templateUrl: './funcionario-read.component.html',
  styleUrls: ['./funcionario-read.component.css']
})
export class FuncionarioReadComponent {
 funcionarios!: Funcionario[];

displayedColumns = ['funId', 'funNome', 'conEmail', 'funCpf', 'conCelular','conTelefoneComercial','funDataAdmissao', 'enderecoCompleto', 'action'];


 constructor(private funcionarioService: FuncionarioService){}

 ngOnInit(): void {
  this.funcionarioService.read().subscribe(funcionarios => {
    this.funcionarios = funcionarios;
    console.log(funcionarios);
  });
 }
}
