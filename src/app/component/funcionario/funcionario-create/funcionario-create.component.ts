import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../funcionario-read/funcionario.model';
import { FuncionarioService } from '../funcionario.service';
import { Router } from '@angular/router';
import { Cargo } from '../../cargo/cargo-read/cargo.model';
import { CargoFuncService } from '../../cargo/cargo-func.service';

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
    carId: undefined,

    conCelular: '',
    conTelefoneComercial: '',
    conEmail: '',

    endRua: '',
    endNumero: '',
    endCidade: '',
    endCep: '',
    endEstado: ''
  };

cargos: Cargo[] = [];


  constructor(
    private funcionarioService: FuncionarioService,
    private cargoService: CargoFuncService,
    private router: Router
  ) {}

  ngOnInit(): void {

      this.cargoService.read().subscribe(dados => {
      this.cargos = dados;
    });

  }

  createFuncionario(): void {
    const f = this.funcionario;

    if (
      !f.funNome.trim() ||
      !f.funCpf?.trim() ||
      f.funCpf.length !== 14 ||
      !this.isCpfValid(f.funCpf) ||
      !f.conCelular.trim() ||
      !f.conEmail.trim() ||
      !f.endRua.trim() ||
      !f.endNumero.trim() ||
      !f.endCidade.trim() ||
      !f.endCep.trim() ||
      !f.carId ||
      !f.endEstado.trim()
    ) {
      this.funcionarioService.showMessage('Por favor, preencha todos os campos corretamente! CPF inválido.');
      return;
    }

    this.funcionarioService.create(this.funcionario).subscribe(() => {
      this.funcionarioService.showMessage('Funcionário criado com sucesso!');
      this.router.navigate(['/funcionarios']);
    });
  }

  cancel(): void {
    this.router.navigate(['/funcionarios']);
  }

  private isCpfValid(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
  }
  apenasLetras(event: KeyboardEvent): void {
  const charCode = event.key;
  const regex = /^[A-Za-zÀ-ÿ\s]*$/;

  if (!regex.test(charCode)) {
    event.preventDefault();
  }
}

bloquearPaste(event: ClipboardEvent): void {
  const texto = event.clipboardData?.getData('text') || '';
  const regex = /^[A-Za-zÀ-ÿ\s]*$/;
  if (!regex.test(texto)) {
    event.preventDefault();
  }
}






apenasNumeros(event: KeyboardEvent): void {
  const charCode = event.key;
  const regex = /^[0-9]$/;

  if (!regex.test(charCode)) {
    event.preventDefault();
  }
}

bloquearPasteNumeros(event: ClipboardEvent): void {
  const texto = event.clipboardData?.getData('text') || '';
  const regex = /^[0-9]+$/;
  if (!regex.test(texto)) {
    event.preventDefault();
  }
}


}
