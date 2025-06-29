import { Marca } from '../../marca/marca-read/marca.model';
import { Supplier } from '../../supplier/supplier-read/supplier.model'; 

export interface Product {
  proId?: number
  proNome: string
  proPrecoCusto: number
  proPrecoVenda: number
  proQuantidade: number
  proDescricao: string
  proCodigoBarras: string
  proAtivo: boolean
  proDataCadastro: Date
  proDataAtualizacao: Date
  proCategoria: string
 fornecedor?: Supplier
 marca?: Marca
}