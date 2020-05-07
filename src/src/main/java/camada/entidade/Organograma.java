package camada.entidade;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import camada.dao.Dao;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "tbOrganograma")
public class Organograma extends Dao{

	
	@Id
	@PrimaryKeyJoinColumn
	@Column(name = "id_nVarOrganograma", nullable = false)
	private long id;
	
	@ManyToOne
	@JoinColumn(name="id_nVarEmpresa")
	private Empresa empresa;
	
	@Column(name = "nVarNome", nullable = false)
	private String nome;
	
	@Column(name = "nVarDescricao", nullable = false)
	private String descricao;
	
	@Column(name = "id_nVarPaiOrganograma", nullable = false)
	private long idPaiOrganograma;
	
	//montar relacionamento com tabela usuario
	@Column(name = "id_nvarUsuario", nullable = false)
	private String idUsuario;
	
	@ManyToMany(mappedBy = "organogramas")
	private Set<Funcionario> funcionarios;
	
//	@OneToMany(mappedBy = "organograma", targetEntity = Processo.class, fetch = FetchType.LAZY)
//	private Processo processo;
	
	public void salvar() {
			
		iniciarOperacao();
		
		setId(sequence());
		session.save(this);
		
		finalizarOperacao();
		
	} 
	
	public List<Organograma> find(){
			
		iniciarOperacao();
		
		List<Organograma> listaOrganogramas = new ArrayList<Organograma>();
		listaOrganogramas = session.createQuery("SELECT a FROM Organograma a", Organograma.class).getResultList();
		
		finalizarOperacao();
		
		return listaOrganogramas;
	}

	public List<Organograma> findOrganogramaPorEmpresa() {

		iniciarOperacao();
		
		List<Organograma> listaOrganograma = session.createQuery("SELECT a FROM Organograma a Where a.empresa ='"+ this.empresa.getId()+"'", Organograma.class).getResultList();
		
		finalizarOperacao();
		
		return listaOrganograma;
	}

	public String iniciarDelete() {
		
		iniciarOperacao();
		
		//validacao se tem relacionamento com id_pai
		List<Organograma> listaOrganogramas = new ArrayList<Organograma>();
		listaOrganogramas = session.createQuery("SELECT a FROM Organograma a where a.idPaiOrganograma ='"+ this.id+"'", Organograma.class).getResultList();
		
		//Se tiver filho, o usuario deve alterar na mão.
		if(listaOrganogramas.isEmpty()){
			Organograma organograma = (Organograma)session.load(Organograma.class, this.id);
			
//			o usuário tem a chance de escolher se quer deletar mesmo com funcionario associado.
			if(!organograma.getFuncionarios().isEmpty()) {
				finalizarOperacao();
				return "Existe funcionario associado.";
			}
			else{
				session.delete(organograma);
				finalizarOperacao();
				return "Deletado.";
			}
		}
		
		finalizarOperacao();
		
		return "Existe filho associado.";
	}
	
	public boolean deletar() {
		
		iniciarOperacao();
		
		Organograma organograma = (Organograma)session.load(Organograma.class, this.id);
			
		session.createSQLQuery("Delete tbFuncionarioOrganograma where id_nVarOrganograma ='"+ this.id+"'").executeUpdate();
		session.delete(organograma);
			
		finalizarOperacao();
		return true;
	}

	public void atualizar() {
		
		iniciarOperacao();
		
		session.update(this);
		
		finalizarOperacao();
		
	} 
	
	public String montarArvore() {
		StringBuilder arvore = new StringBuilder("[");
		List<Organograma> listaOrganograma = findOrganogramaPorEmpresa();
		if(!listaOrganograma.isEmpty()) {
			Iterator<Organograma> it = listaOrganograma.iterator();
			for(Organograma o : listaOrganograma){
				it.next();
				arvore.append("{\"id\":"+o.getId()+",\"text\":"+o.getNome()+",\"parent\":"+o.getIdPaiOrganograma()+"}");
				if(it.hasNext()) {
					arvore.append(",");
				}
			}
		}
		arvore.append("]");
		return arvore.toString();
	}
}
