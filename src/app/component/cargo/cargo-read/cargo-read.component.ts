import { Component } from '@angular/core';
import { Cargo } from './cargo.model';
import { CargoFuncService } from '../cargo-func.service';

@Component({
  selector: 'app-cargo-read',
  templateUrl: './cargo-read.component.html',
  styleUrls: ['./cargo-read.component.css']
})
export class CargoReadComponent {
cargos!: Cargo[];
displayedColumns = ['carId', 'carNome', 'carDescricao', 'carAtivo', 'action'];

constructor(private cargoFuncService: CargoFuncService){}

  ngOnInit(): void {
      this.cargoFuncService.read().subscribe(cargos => {
          this.cargos = cargos;
          console.log(cargos);
      });
  }
}