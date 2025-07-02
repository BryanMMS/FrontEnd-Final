import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../funcionario-read/funcionario.model';
import { FuncionarioService } from '../funcionario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funcionario-create',
  templateUrl: './funcionario-create.component.html',
  styleUrls: ['./funcionario-create.component.css']
})
export class FuncionarioCreateComponent implements OnInit {

  funcionario: Funcionario = {
    funNome: '',
    funCpf: '',
   funDataAdmissao: new Date(),

    conCelular: '',
    conTelefoneComercial: '',
    conEmail: '',

    endRua: '',
    endNumero: '',
    endCidade: '',
    endCep: '',
    endEstado: ''
  }
  constructor(private funcionarioService: FuncionarioService, private router: Router) { }

  ngOnInit(): void {}

  createFuncionario(): void {
    const f = this.funcionario;

    if (!f.funNome.trim() ||  !this.funcionario.funCpf?.trim() || this.funcionario.funCpf.length !== 14 || !f.conCelular.trim() || !f.conEmail.trim() ||
        !f.endRua.trim() || !f.endNumero.trim() || !f.endCidade.trim() || !f.endCep.trim() || !f.endEstado.trim()) {
      this.funcionarioService.showMessage('Por favor, preencha todos os campos corretamente!');
      return;
    }

    this.funcionarioService.create(this.funcionario).subscribe(() => {
      this.funcionarioService.showMessage('Fucionário criado com sucesso!');
      this.router.navigate(['/funcionarios']);
    });
  }

  cancel(): void {
    this.router.navigate(['/funcionarios']);
  }
}
