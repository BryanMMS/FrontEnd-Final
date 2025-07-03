import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../funcionario-read/funcionario.model';
import { FuncionarioService } from '../funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cargo } from '../../cargo/cargo-read/cargo.model';
import { CargoFuncService } from '../../cargo/cargo-func.service';

@Component({
  selector: 'app-funcionario-update',
  templateUrl: './funcionario-update.component.html',
  styleUrls: ['./funcionario-update.component.css']
})
export class FuncionarioUpdateComponent implements OnInit {
  funcionario!: Funcionario;
  cargos: Cargo[] = [];

  // variável para controlar o select do Cargo (apenas o id)
  selectedCargoId!: number;

  constructor(
    private funcionarioService: FuncionarioService,
    private cargoService: CargoFuncService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.funcionarioService.readById(id!).subscribe((funcionario: Funcionario) => {
      this.funcionario = funcionario;

      // Usa carId diretamente
      this.selectedCargoId = funcionario.carId || 0;
    });

    this.cargoService.read().subscribe((dados: Cargo[]) => {
      this.cargos = dados;
    });
  }

  updateFuncionario(): void {
    if (!this.selectedCargoId) {
      this.funcionarioService.showMessage('Cargo é obrigatório!');
      return;
    }

    // Atualiza o carId no funcionario antes de enviar
    this.funcionario.carId = this.selectedCargoId;

    const f = this.funcionario;

    if (
      !f.funNome.trim() ||
      !f.funCpf?.trim() ||
      !f.carId ||
      f.funCpf.length !== 14 ||
      !this.isCpfValid(f.funCpf) ||
      !f.conEmail.trim() ||
      !f.conTelefoneComercial.trim() ||
      !f.endRua.trim() ||
      !f.endNumero.trim() ||
      !f.endCidade.trim() ||
      !f.endCep.trim() ||
      !f.endEstado.trim()
    ) {
      this.funcionarioService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente! CPF inválido.');
      return;
    }

    this.funcionarioService.update(this.funcionario).subscribe(() => {
      this.funcionarioService.showMessage('Funcionário atualizado com sucesso!');
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
}
