import { Component, OnInit } from '@angular/core';
import { Supplier } from '../supplier-read/supplier.model';
import { SupplierService } from '../supplier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css']
})
export class SupplierCreateComponent implements OnInit{
   supplier: Supplier = {
    forRazaoSocial:'',
    forNomeFantasia:'',
    forCnpj: '',

    conCelular: '',
    conTelefoneComercial: '',
    conEmail: '',

    endRua: '',
    endNumero: '',
    endCidade: '',
    endCep: '',
    endEstado: ''

   }

   constructor(private supplierService: SupplierService, private router:Router) { }

    ngOnInit(): void {
        
    }
createSupplier(): void {
    console.log('DEBUG => Dados do formulário:');
  console.log(this.supplier);
    const s = this.supplier;
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
  if (
    !this.supplier.forRazaoSocial.trim() ||
    !this.supplier.forNomeFantasia.trim() ||
    !this.supplier.forCnpj?.trim() || 
  !cnpjRegex.test(s.forCnpj) || 
    !s.conCelular.trim() ||
     !s.conEmail.trim() ||
        !s.endRua.trim() ||
         !s.endNumero.trim() ||
          !s.endCidade.trim() ||
           !s.endCep.trim() || 
           !s.endEstado.trim()) {
    this.supplierService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente!');
    return;
  }

  this.supplierService.create(this.supplier).subscribe(() => {
    this.supplierService.showMessage('Fornecedor criado!');
    this.router.navigate(['/suppliers']);
  });
}

    cancel(): void {
      this.router.navigate(['/suppliers'])
    }
}
