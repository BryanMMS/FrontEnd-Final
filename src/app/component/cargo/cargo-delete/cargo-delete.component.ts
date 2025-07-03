import { Component } from '@angular/core';
import { Cargo } from '../cargo-read/cargo.model';
import { CargoFuncService } from '../cargo-func.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cargo-delete',
  templateUrl: './cargo-delete.component.html',
  styleUrls: ['./cargo-delete.component.css']
})
export class CargoDeleteComponent {
  cargo!: Cargo;

  constructor(
    private cargoService: CargoFuncService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const carId = this.route.snapshot.paramMap.get('carId');
    this.cargoService.readById(carId!).subscribe(cargo =>{
      this.cargo = cargo
    })
  }

  deleteCargo(): void {
    this.cargoService.delete(this.cargo.carId!).subscribe(() =>{
    this.cargoService.showMessage('Cargo excluido com sucesso!')  
    this.router.navigate(['/cargos'])
    })
  }

  cancel(): void{
    this.router.navigate(['/cargos'])
  }
}