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
    forCnpj: ''

   }

   constructor(private supplierService: SupplierService,
    private router:Router) { }

    ngOnInit(): void {
        
    }
createSupplier(): void {
  if (
    !this.supplier.forRazaoSocial.trim() ||
    !this.supplier.forNomeFantasia.trim() ||
    !this.supplier.forCnpj.trim()
  ) {
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
