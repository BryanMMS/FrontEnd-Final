import { Component } from '@angular/core';
import { Supplier } from '../supplier-read/supplier.model';
import { SupplierService } from '../supplier.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-supplier-update',
  templateUrl: './supplier-update.component.html',
  styleUrls: ['./supplier-update.component.css']
})
export class SupplierUpdateComponent {
  supplier!: Supplier;

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.supplierService.readById(id!).subscribe((supplier: Supplier) => {
      this.supplier = supplier;
    });
  }

  updateSupplier(): void {
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    
    if (
      !this.supplier.forRazaoSocial.trim() ||
      !this.supplier.forNomeFantasia.trim() ||
      !this.supplier.forCnpj?.trim() ||
      !cnpjRegex.test(this.supplier.forCnpj) ||
      !this.supplier.conCelular.trim() ||
      !this.supplier.conEmail.trim() ||
      !this.supplier.endRua.trim() ||
      !this.supplier.endNumero.trim() ||
      !this.supplier.endCidade.trim() ||
      !this.supplier.endCep.trim() ||
      !this.supplier.endEstado.trim()
    ) {
      this.supplierService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente!');
      return;
    }

    this.supplierService.update(this.supplier).subscribe(() => {
      this.supplierService.showMessage('Fornecedor atualizado com sucesso!');
      this.router.navigate(['/suppliers']);
    });
  }

  cancel(): void {
    this.router.navigate(['/suppliers']);
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


apenasNumeros(event: KeyboardEvent): void {
  const charCode = event.key;
  const regex = /^[0-9]$/;

  if (!regex.test(charCode)) {
    event.preventDefault();
  }
}

bloquearPasteNumeros(event: ClipboardEvent): void {
  const texto = event.clipboardData?.getData('text') || '';
  const regex = /^[0-9]+$/;
  if (!regex.test(texto)) {
    event.preventDefault();
  }
}

}
