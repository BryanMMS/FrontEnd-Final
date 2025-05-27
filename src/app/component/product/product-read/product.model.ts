/**
 * Interface que representa um produto.
 */
export interface Product {
    proId?: number;          // Identificador único do produto (opcional)
    proNome: string;         // Nome do produto
    proPrecoCusto: number;   // Preço de custo do produto
    proPrecoVenda: number;   // Preço de venda do produto
    proQuantidade: number;
    proDescricao: string;
    proCodigoBarras: string;
    proMarca: string;
    proAtivo: boolean;
    proDataCadastro: Date;
    proDataAtualizacao: Date;
    proCategoria: string;
}