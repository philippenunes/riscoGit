import { Router } from '@angular/router';
import { Empresa } from './../../core/model/empresa';
import { NotificacaoService } from './../../shared/services/notificacao.service';
import { SpinnerService } from './../../shared/services/spinner.service';
import { FuncionarioService } from './../../funcionario/funcionario.service';
import { Observable, pipe, empty, BehaviorSubject } from 'rxjs';
import { ModalEmployeeListComponent } from './../../shared/modal-employee-list/modal-employee-list.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrganogramaService } from './../organograma.service';
import { TreeNode } from '../../core/model/treeNode';
import { Component, OnInit, TemplateRef, EventEmitter, Output } from '@angular/core';
import { tap, take, catchError } from 'rxjs/operators';
import { Funcionario } from 'src/app/core/model/funcionario';
import { BsModalService , BsModalRef } from 'ngx-bootstrap/modal' ;
import { Messages } from 'src/app/shared/message';
import { Organograma } from '../../core/model/organograma';
declare var $: any;

@Component({
  selector: 'app-organograma-tree',
  templateUrl: './organograma-tree.component.html',
  styleUrls: ['./organograma-tree.component.css']
})
export class OrganogramaTreeComponent implements OnInit {

  jsonTreeData: TreeNode[];
  jsonOrgData: Organograma[];
  bsModalRef: BsModalRef;
  empresa: Empresa = {
    id: 1,
    nome: 'XPTO',
    descricao: 'XPTO Internacional',
    organogramas: null
  }

  @Output()
  pendingChanges = new EventEmitter();

  constructor(
    private organogramaService: OrganogramaService,
    private funcionarioService: FuncionarioService,
    private spinner: SpinnerService,
    private notify: NotificacaoService,
    private modalService: BsModalService,
    private router: Router
  ) { }

  onSave() {
    //Conversão dos dados da árvore para Organograma.
    this.jsonOrgData = this.jsonTreeData
    .map((elem) => {
       let org: Organograma = {
         id: elem.id,
         empresa: this.empresa,
         nome: elem.text,
         descricao: null,
         idPaiOrganograma: String(elem.parent) == "#" ? null : elem.parent,
         idUsuario: null,
         funcionarios: elem.employees
       }
       return org;
    })
    this.organogramaService.update(this.jsonOrgData)
      .subscribe(
        success => {
          this.notify.showSuccess(`Organograma ${Messages.alteradoSucesso}`, Messages.sucesso);
        },
        error => {
          this.notify.showError(error.statusText, Messages.erro);
        }
      )
  }

  async openEmployeeModalList(idOrgNode) {
    //Carrega a lista de funcionários no LocalStorage.
    //(Necessário pois os dados serão modificados por dois componentes.)
    let employeesList: any = localStorage.getItem("tbFuncionarios");
    employeesList = JSON.parse(employeesList);

    //Caso não tenha funcionários no LocalStorage busca no banco por chamada síncrona
    //E guarda no localStorage.
    if(employeesList == null || employeesList == undefined) {
      employeesList = await this.funcionarioService.getEmployeesByIdEmpresa(1);
      localStorage.setItem("tbFuncionarios", JSON.stringify(employeesList));
    }

    //Parâmetros que serão passados para a Modal.
    const initialState = {
      nameEmpresa: 'XPTO',
      employeesList: employeesList,
      idOrgNode: idOrgNode
    };

    //Chama a Modal passando os parâmetros.
    this.bsModalRef = this.modalService.show(
      ModalEmployeeListComponent,
      Object.assign({initialState}, { class: 'gray modal-lg' }));

    //Inscrição do evento de retorno do modal com os funcionários selecionados.
    //Atualiza os funcionarios no localStorage e inclui no Organograma.
    this.bsModalRef.content.passEntry.subscribe((employees) => {
      localStorage.setItem("tbFuncionarios", JSON.stringify(employees));
      this.jsonTreeData = this.jsonTreeData.map((elem) => {
        if(elem.id == idOrgNode) {
          return {
            id: elem.id,
            text: elem.text,
            parent: elem.parent,
            employees: employees.reduce((result, elem) => {
              if(elem.idSetorEmpresa == idOrgNode) {
                result.push(elem);
              }
              return result;
            },[])
          }
        }
        return elem;
      });
      console.log("Após incluir/exluir funcionários >>>", this.jsonTreeData)
    })
  }

  async onRenameNode(data) {
    //Procura o elemento na árvore.
    const node = this.jsonTreeData.find(element => element.id == data.node.id);
    //Caso não exista, significa que é um novo nó.
    if(node == undefined) {
      //busca a próxima sequence no banco de dados por chamada síncrona.
      let sequence = await this.organogramaService.getNextSequence();
      //Cria o novo objeto nó
      const newNode: TreeNode = {
        id: sequence,
        text: data.text,
        parent: data.node.parent,
        employees: []
      };
      this.jsonTreeData.push(newNode);
      console.log(this.jsonTreeData)
    } else {
      const newName = data.text;
      this.jsonTreeData = this.jsonTreeData.map( item => {
         item.text = item.id == node.id ? newName : item.text;
         return item;
      });
      console.log("Após o rename: ", this.jsonTreeData);
    }
  }

  onDeleteNode(data) {
    //Verifica se existe nó filho. Caso exista, exclui todos os filhos.
    if(data.node.children_d != undefined) {
      this.jsonTreeData = this.jsonTreeData.reduce((result, elem) => {
        if (!data.node.children_d.includes(String(elem.id), 0)) {
          result.push(elem);
        }
        return result;
      }, []);
    }
    //Exclui o nó principal.
    const index = this.jsonTreeData.findIndex((node) => node.id  == data.node.id ? node.id : "" );
    this.jsonTreeData.splice(index, 1);
    console.log("Após o delete: ", this.jsonTreeData);

    //Obtém a lista de funcionários do localStorage.
    let employeesList: any = localStorage.getItem("tbFuncionarios");
    employeesList = JSON.parse(employeesList);

    //Desvincula os funcionários do setor caso exista.
    if(employeesList != null || employeesList != undefined) {
      employeesList = employeesList.map((elem) => {
        if(elem.idSetorEmpresa = data.node.id) {
          elem.idSetorEmpresa = null;
        }
        return elem;
      })
      //Atualiza a lista de funcionários no localStorage.
      localStorage.setItem("tbFuncionarios", JSON.stringify(employeesList));
    }
  }

  createTree() {
    $('#organogramaTree')
      .jstree({
        core: {
          "check_callback": true,
          'themes': {
            'name': 'proton',
            'responsive': true
          },
          'data': this.jsonTreeData
        },
        "types": {
          "default": {
            "valid_children": ["default", "file"]
          }
        },
        "plugins": ["themes", "contextmenu", "dnd",
        "state", "types", "changed", "unique"],
        "contextmenu": {
          "items": ($node) => {
            let tree = $('#organogramaTree').jstree(true);
            return {
              "Create": {
                "separator_before": false,
                "separator_after": false,
                "_class": "teste",
                "label": "Novo setor",
                "action": () => {
                  this.pendingChanges.emit(true);
                  $node = tree.create_node($node);
                  tree.edit($node);
                }
              },
              "Rename": {
                "separator_before": false,
                "separator_after": false,
                "label": "Renomear setor",
                "action": () => {
                  this.pendingChanges.emit(true);
                  tree.edit($node);
                }
              },
              "Delete": {
                "separator_before": false,
                "separator_after": false,
                "label": "Remover",
                "_disabled": () => {
                    return $node.parent == "#" ? true : false;
                  },
                "action": () => {
                  this.pendingChanges.emit(true);
                  tree.delete_node($node);
                }
              },
              "AddFuncionario": {
                "separator_before": false,
                "separator_after": false,
                "label": "Incluir funcionário",
                "action": () => {
                  this.pendingChanges.emit(true);
                  this.openEmployeeModalList($node.id);
                }
              }
            }
          }
        }
      }).on('rename_node.jstree', (e, data) => {
        this.onRenameNode(data);
      }).on("delete_node.jstree", (e, data) => {
        this.onDeleteNode(data);
      }).on("changed.jstree", (e, data) => {
        let idNode = data.selected[0];
        if(idNode != undefined) {
          this.router.navigate(['organograma/tree/detail'], {queryParams: {id: data.node.id, name: data.node.text}});
        }
      });
  };

  ngOnInit(): void {
    this.organogramaService.getOrganogramaByEmpresa(this.empresa.id).subscribe(
        (data) => {
          this.jsonTreeData = data;
          this.createTree();
        },
      );
    }
  }

