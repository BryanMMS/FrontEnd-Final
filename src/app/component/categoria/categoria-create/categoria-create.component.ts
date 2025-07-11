import { Component, OnInit } from '@angular/core';
import { Categoria } from '../categoria-read/categoria.model';
import { CategoriaService } from '../categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css']
})
export class CategoriaCreateComponent implements OnInit {
  categoria: Categoria ={
  ctgNome: '',
  ctgDescricao: '',
  ctgDataAtualizado: undefined,
  ctgDataCadastro: new Date(),
  ctgAtivo: false
  };

  constructor(private categoriaService: CategoriaService,
    private router: Router){}


    ngOnInit(): void {
      
    }


    createCategoria(): void{
    // Verificação: nenhum campo pode estar vazio ou com valores inválidos
if(
!this.categoria.ctgNome.trim()
){
  this.categoriaService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente!');
  return;
}
   // Se passou na validação, prossegue com o cadastro
    this.categoriaService.create(this.categoria).subscribe(() => {
      this.categoriaService.showMessage('Categoria criado!');
      this.router.navigate(['/categorias']);
});

}

cancel(): void{
  this.router.navigate(['/categorias']);
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
