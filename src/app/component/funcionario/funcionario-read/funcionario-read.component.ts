import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../funcionario.service';
import { CargoFuncService } from '../../cargo/cargo-func.service';
import { Funcionario } from './funcionario.model';
import { Cargo } from '../../cargo/cargo-read/cargo.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-funcionario-read',
  templateUrl: './funcionario-read.component.html',
  styleUrls: ['./funcionario-read.component.css']
})
export class FuncionarioReadComponent implements OnInit {
  funcionarios!: MatTableDataSource<Funcionario>;
  cargos: Cargo[] = [];

  displayedColumns = [
    'funId', 'funNome', 'conEmail', 'funCpf', 'cargo',
    'conCelular', 'conTelefoneComercial', 'funDataAdmissao', 'enderecoCompleto', 'action'
  ];

  filters = {
    nome: '',
    email: '',
    cpf: '',
    cargo: '',
    dataAdmissao: ''
  };

  constructor(
    private funcionarioService: FuncionarioService,
    private cargoService: CargoFuncService
  ) {}

  ngOnInit(): void {
    this.funcionarioService.read().subscribe(funcionarios => {
      this.funcionarios = new MatTableDataSource(funcionarios);

      this.funcionarios.filterPredicate = (data: Funcionario, filter: string) => {
        const nomeMatch = data.funNome.toLowerCase().includes(this.filters.nome.toLowerCase());
        const emailMatch = data.conEmail.toLowerCase().includes(this.filters.email.toLowerCase());
        const cpfMatch = data.funCpf.toLowerCase().includes(this.filters.cpf.toLowerCase());

        const cargoNome = this.getCargoNomeById(data.carId);
        const cargoMatch = cargoNome.toLowerCase().includes(this.filters.cargo.toLowerCase());

        const dataAdmissaoStr = new Date(data.funDataAdmissao).toLocaleDateString('pt-BR');
        const dataAdmissaoMatch = dataAdmissaoStr.includes(this.filters.dataAdmissao);

        return nomeMatch && emailMatch && cpfMatch && cargoMatch && dataAdmissaoMatch;
      };
    });

    this.cargoService.read().subscribe(cargos => {
      this.cargos = cargos;
    });
  }

  onFilterChange(field: keyof typeof this.filters, event: Event | MatSelectChange) {
    const value = event instanceof MatSelectChange
      ? event.value
      : (event.target as HTMLInputElement).value;

    this.filters[field] = value;
    this.funcionarios.filter = Math.random().toString(); // força atualização
  }

  getCargoNomeById(id: number | undefined): string {
    if (!id) return '';
    const cargo = this.cargos.find(c => c.carId === id);
    return cargo ? cargo.carNome : '';
  }
}
