import { Empresa } from './empresa';
import { Funcionario } from 'src/app/core/model/funcionario';
export interface Organograma {
   id: number,
   empresa: Empresa,
   nome: string,
   descricao: string,
   idPaiOrganograma: number,
   idUsuario: number,
   funcionarios: Funcionario[]
}
