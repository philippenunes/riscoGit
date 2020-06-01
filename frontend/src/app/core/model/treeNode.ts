import { Funcionario } from 'src/app/core/model/funcionario';
export interface TreeNode {
  id: number,
  text: string,
  parent: number,
  employees: Funcionario[]
}
