import { Empresa } from './../empresa/empresa';
export interface Organograma {
   id: number,
   empresa: Empresa;
   nome: string,
   descricao: string,
   idPaiOrganograma: number,
  //  funcionarios: Funciionario[];
}
