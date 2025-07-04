import { Component } from '@angular/core';
import { Categoria } from '../categoria-read/categoria.model';
import { CategoriaService } from '../categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent {
  categoria!: Categoria;

  constructor(private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.categoriaService.readById(id!).subscribe((categoria: Categoria) =>{
      this.categoria = categoria
    })
  }

  updateCategoria(): void {
    // Verificação: nenhum campo pode estar vazio ou com valores inválidos
    if (
      !this.categoria.ctgNome.trim() ||
      (this.categoria.ctgAtivo !== true && this.categoria.ctgAtivo !== false) // validação para booleano ctgAtivo
    ) {
      this.categoriaService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente!');
      return;
    }
    // Se passou na validação, prossegue com a atualização
    this.categoriaService.update(this.categoria).subscribe(() => {
      this.categoriaService.showMessage('Categoria atualizado com sucesso!');
      this.router.navigate(['/categorias']);
    });
  }
  cancel(): void {
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

