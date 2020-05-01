package camada.entidade;

import java.util.ArrayList;
import java.util.Collection;
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

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

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
	
	@ManyToMany(mappedBy = "organogramas")
	private Set<Funcionario> funcionarios;
	
	public void salvar() {
			
		iniciarOperacao();
			
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

	public List<Organograma> findOrganogramaPorEmpresa(Empresa empresa) {

		iniciarOperacao();
		
		List<Organograma> listaOrganograma = session.createQuery("SELECT a FROM Organograma a Where a.empresa ='"+ this.empresa+"'", Organograma.class).getResultList();
		
		finalizarOperacao();
		
		return listaOrganograma;
	}

	public String iniciarDelete() {
		
		iniciarOperacao();
		
		//validacao se tem relacionamento com id_pai
		List<Organograma> listaOrganogramas = new ArrayList<Organograma>();
		listaOrganogramas = session.createQuery("SELECT a FROM Organograma a where a.idPaiOrganograma ='"+ this.id+"'", Organograma.class).getResultList();
		
		if(listaOrganogramas.isEmpty()){
			Organograma organograma = (Organograma)session.load(Organograma.class, this.id);
			
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
}
