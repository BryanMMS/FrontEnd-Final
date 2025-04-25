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

  constructor(private supplierService: SupplierService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.supplierService.readById(id!).subscribe((supplier: Supplier) =>{
      this.supplier = supplier
    })
  }

  updateSupplier(): void {
    this.supplierService.update(this.supplier).subscribe(() => {
      this.supplierService.showMessage('Fornecedor atualizado com sucesso!')
      this.router.navigate(['/suppliers'])
    })
  }

  cancel(): void {
    this.router.navigate(['/suppliers'])
  }
}
