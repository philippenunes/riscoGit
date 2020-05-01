import { Organograma } from './../organograma/organograma';
export interface Empresa {
  id: number,
  nome: String,
  descricao: String,
  organogramas: Organograma[]
}
