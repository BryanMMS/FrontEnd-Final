import { ActivatedRoute, Router } from "@angular/router";
import { CargoFuncService } from "../../cargo/cargo-func.service";
import { Cargo } from "../../cargo/cargo-read/cargo.model";
import { Funcionario } from "../funcionario-read/funcionario.model";
import { FuncionarioService } from "../funcionario.service";
import { Component, OnInit } from '@angular/core'; 

@Component({
  selector: 'app-funcionario-delete',
  templateUrl: './funcionario-delete.component.html',
  styleUrls: ['./funcionario-delete.component.css']
})

export class FuncionarioDeleteComponent implements OnInit {
  funcionario!: Funcionario;

  cargos: Cargo[] = []; // <-- declare aqui

  constructor(
    private funcionarioService: FuncionarioService,
    private cargoService: CargoFuncService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const funId = this.route.snapshot.paramMap.get('funId');
    this.funcionarioService.readById(funId!).subscribe(funcionario => {
      this.funcionario = funcionario;
    });

    // Carrega os cargos para poder usar no getCargoNomeById
    this.cargoService.read().subscribe(cargos => {
      this.cargos = cargos;
    });
  }

  getCargoNomeById(id: number | undefined): string {
    if (!id) return '';
    const cargo = this.cargos.find(c => c.carId === id);
    return cargo ? cargo.carNome : '';
  }

  deleteFuncionario(): void {
    this.funcionarioService.delete(this.funcionario.funId!).subscribe(() => {
      this.funcionarioService.showMessage('Funcionário excluído com sucesso!');
      this.router.navigate(['/funcionarios']);
    });
  }

  cancel(): void {
    this.router.navigate(['/funcionarios']);
  }
}