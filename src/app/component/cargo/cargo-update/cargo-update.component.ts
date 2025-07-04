import { Component } from '@angular/core';
import { Cargo } from '../cargo-read/cargo.model';
import { CargoFuncService } from '../cargo-func.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cargo-update',
  templateUrl: './cargo-update.component.html',
  styleUrls: ['./cargo-update.component.css']
})
export class CargoUpdateComponent {
  cargo!: Cargo;

  constructor(private cargoService: CargoFuncService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.cargoService.readById(id!).subscribe((cargo: Cargo) =>{
      this.cargo = cargo
    })
  }

  updateCargo(): void {
    // Verificação: nenhum campo pode estar vazio ou com valores inválidos
    if (
      !this.cargo.carNome.trim() ||
      (this.cargo.carAtivo !== true && this.cargo.carAtivo !== false) // validação para booleano carAtivo
    ) {
      this.cargoService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente!');
      return;
    }
    // Se passou na validação, prossegue com a atualização
    this.cargoService.update(this.cargo).subscribe(() => {
      this.cargoService.showMessage('Cargo atualizado com sucesso!');
      this.router.navigate(['/cargos']);
    });
  }
  cancel(): void {
    this.router.navigate(['/cargos']);
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



}