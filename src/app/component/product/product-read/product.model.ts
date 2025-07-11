import { Categoria } from '../../categoria/categoria-read/categoria.model';
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
  proDataAtualizacao?: Date; 
 fornecedor?: Supplier
 marca?: Marca
 categoria?: Categoria
}