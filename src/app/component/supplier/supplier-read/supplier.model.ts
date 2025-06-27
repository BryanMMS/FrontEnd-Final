export interface Supplier {
  forId?: number;
  forRazaoSocial: string;
  forNomeFantasia: string;
  forCnpj: string;  // CNPJ como string para manter zeros à esquerda e formato
}