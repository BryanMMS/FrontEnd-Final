import { Component } from '@angular/core';
import { PaymentMethod } from '../payment-method-read/paymentMethod.model';
import { PaymentMethodService } from '../payment-method.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-method-update',
  templateUrl: './payment-method-update.component.html',
  styleUrls: ['./payment-method-update.component.css']
})
export class PaymentMethodUpdateComponent {
  paymentMethod!: PaymentMethod;

  constructor(private paymentMethodService: PaymentMethodService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.paymentMethodService.readById(id!).subscribe((paymentMethod: PaymentMethod) =>{
      this.paymentMethod = paymentMethod
    })
  }

    updatePaymentMethod(): void {
    // Verificação: nenhum campo pode estar vazio ou com valores inválidos
    if (
      !this.paymentMethod.fpgDescricao.trim() ||  
      !this.paymentMethod.fpgTaxaAdicional.trim() ||
      !this.paymentMethod.fpgTipo.trim() 
  
    ) {
      this.paymentMethodService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente!');
      return;
    }
    // Se passou na validação, prossegue com a atualização
    this.paymentMethodService.update(this.paymentMethod).subscribe(() => {
      this.paymentMethodService.showMessage('Forma de Pagamento atualizado com sucesso!');
      this.router.navigate(['/paymentMethods']);
    });
  }
  cancel(): void {
    this.router.navigate(['/paymentMethods']);
  }}