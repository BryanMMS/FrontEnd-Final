import { Component, OnInit } from '@angular/core';
import { Cargo } from '../cargo-read/cargo.model';
import { CargoFuncService } from '../cargo-func.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cargo-create',
  templateUrl: './cargo-create.component.html',
  styleUrls: ['./cargo-create.component.css']
})
export class CargoCreateComponent  implements OnInit{
cargo: Cargo ={
    carNome: '',
    carDescricao: '',
    carDataCadastro: new Date(),
    carDataAtualizado: new Date(),
    carAtivo: false
};

constructor(private cargoService: CargoFuncService,
  private router:Router){}


  ngOnInit(): void {
    
  }

createCargo(): void{
    // Verificação: nenhum campo pode estar vazio ou com valores inválidos
if(
!this.cargo.carNome.trim()
){
  this.cargoService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente!');
  return;
}
   // Se passou na validação, prossegue com o cadastro
    this.cargoService.create(this.cargo).subscribe(() => {
      this.cargoService.showMessage('Cargo criado!');
      this.router.navigate(['/cargos']);
});

}

cancel(): void{
  this.router.navigate(['/cargos']);
}
}