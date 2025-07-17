import { Cliente } from '../../cliente/cliente-read/cliente.model';
import { Funcionario } from '../../funcionario/funcionario-read/funcionario.model';
import { PaymentMethod } from '../../paymentMethod/payment-method-read/paymentMethod.model';
import { ItemVenda } from '../../venda/venda-read/itemVenda.model';


export interface Venda {
  vndId?: number;
  cliente: Cliente;
  funcionario: Funcionario;
  formaPagamento: PaymentMethod;
  vndDataVenda?: Date;
  vndTotal?: number;
  vndConcluida: boolean;
  vndObservacao: string;
  itens: ItemVenda[];
}