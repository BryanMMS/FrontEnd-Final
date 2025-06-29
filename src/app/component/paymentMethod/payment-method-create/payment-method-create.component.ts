import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from '../payment-method-read/paymentMethod.model';
import { PaymentMethodService } from '../payment-method.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-method-create',
  templateUrl: './payment-method-create.component.html',
  styleUrls: ['./payment-method-create.component.css']
})
export class PaymentMethodCreateComponent implements OnInit{
paymentMethod: PaymentMethod={
  fpgDescricao: '',
  fpgTipo: '',
  fpgPermiteParcelamento: false,
  fpgNumMaxParcelas: null,
  fpgTaxaAdicional: ''

}

constructor(private paymentMethodService: PaymentMethodService,
  private router:Router){}

  ngOnInit(): void {
      
  }

  createPaymentMethod(): void {
    // Verificação: nenhum campo pode estar vazio ou com valores inválidos
    if (
      !this.paymentMethod.fpgTaxaAdicional.trim() ||
      !this.paymentMethod.fpgTaxaAdicional.trim() 
    ) {
      this.paymentMethodService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente!');
      return;
    }

    // Se passou na validação, prossegue com o cadastro
    this.paymentMethodService.create(this.paymentMethod).subscribe(() => {
      this.paymentMethodService.showMessage('Forma de Pagamento criado!');
      this.router.navigate(['/paymentMethods']);
    });
  }

  cancel(): void {
    this.router.navigate(['/paymentMethods']);
  }
}
