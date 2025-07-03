import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../funcionario.service';
import { CargoFuncService } from '../../cargo/cargo-func.service'; // importe serviço de cargos
import { Funcionario } from './funcionario.model';
import { Cargo } from '../../cargo/cargo-read/cargo.model';

@Component({
  selector: 'app-funcionario-read',
  templateUrl: './funcionario-read.component.html',
  styleUrls: ['./funcionario-read.component.css']
})
export class FuncionarioReadComponent implements OnInit {
  funcionarios!: Funcionario[];
  cargos: Cargo[] = [];

  displayedColumns = ['funId', 'funNome', 'conEmail', 'funCpf', 'cargo', 'conCelular', 'conTelefoneComercial', 'funDataAdmissao', 'enderecoCompleto', 'action'];

  constructor(
    private funcionarioService: FuncionarioService,
    private cargoService: CargoFuncService // injete serviço de cargos
  ) {}

  ngOnInit(): void {
    this.funcionarioService.read().subscribe(funcionarios => {
      this.funcionarios = funcionarios;
      console.log(funcionarios);
    });

    // Carregar os cargos para usar depois no lookup
    this.cargoService.read().subscribe(cargos => {
      this.cargos = cargos;
    });
  }

  getCargoNomeById(id: number | undefined): string {
    if (!id) return '';
    const cargo = this.cargos.find(c => c.carId === id);
    return cargo ? cargo.carNome : '';
  }
}
