import { Component } from '@angular/core';
import { Funcionario } from '../funcionario-read/funcionario.model';
import { FuncionarioService } from '../funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-funcionario-update',
  templateUrl: './funcionario-update.component.html',
  styleUrls: ['./funcionario-update.component.css']
})
export class FuncionarioUpdateComponent {
funcionario!: Funcionario;

constructor(private funcionarioService: FuncionarioService,
  private router: Router,
  private route: ActivatedRoute){}


  ngOnInit(): void{
    const id = this.route.snapshot.paramMap.get('id')
    this.funcionarioService.readById(id!).subscribe((funcionario: Funcionario)=>{
      this.funcionario = funcionario
    })
  }

updateFuncionario(): void {
  if (
    !this.funcionario.funNome.trim() ||
  !this.funcionario.funCpf?.trim() ||
   this.funcionario.funCpf.length !== 14 ||
    !this.funcionario.conEmail.trim() ||
    !this.funcionario.conTelefoneComercial.trim() ||
    !this.funcionario.endRua.trim() ||
    !this.funcionario.endNumero.trim() ||
    !this.funcionario.endCidade.trim() ||
    !this.funcionario.endCep.trim() ||
    !this.funcionario.endEstado.trim()
  ) {
    this.funcionarioService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente!');
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
}
