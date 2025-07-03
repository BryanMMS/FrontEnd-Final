import { Cargo } from "../../cargo/cargo-read/cargo.model";

export interface Funcionario{

funId?: number;
funNome: string;
funCpf: string;
funDataAdmissao: Date;
carId?: number;


  // Contato
  conCelular: string;
  conTelefoneComercial: string;
  conEmail: string;

  // Endereço
  endRua: string;
  endNumero: string;
  endCidade: string;
  endCep: string;
  endEstado: string;

}