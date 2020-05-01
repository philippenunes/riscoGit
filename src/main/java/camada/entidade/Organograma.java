package camada.entidade;

import java.util.List;
import java.util.Set;
import javax.persistence.*;

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
	
	@Column(name = "id_nVarPaiOrganograma")
	private Long idPaiOrganograma;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "tbFuncionarioOrganograma",
			joinColumns = @JoinColumn(name="id_nVarOrganograma"),
			inverseJoinColumns = @JoinColumn(name="id_nVarFuncionario"))
	private Set<Funcionario> funcionarios;
	
	public void salvar() {
		iniciarOperacao();
		this.setId(getSequence(this.descricao));
		session.save(this);
		finalizarOperacao();
	}

	public List<Organograma> find(){
		iniciarOperacao();
		List<Organograma> listaOrganogramas;
		listaOrganogramas = session.createQuery("SELECT a FROM Organograma a", Organograma.class).getResultList();
		finalizarOperacao();

		return listaOrganogramas;
	}

	public List findOrganogramaPorEmpresa(long idEmpresa) {
		iniciarOperacao();
		Query query = session.createSQLQuery(
				"WITH organogramaEmpresa\n" +
				"          AS ( SELECT pai.id_nVarOrganograma, pai.id_nVarEmpresa,\n" +
				"                     pai.nVarNome, pai.nVarDescricao, pai.id_nVarPaiOrganograma,\n" +
				"              1 AS OrganogramaLevel\n" +
				"              FROM tbOrganograma as pai\n" +
				"              WHERE pai.id_nVarPaiOrganograma IS NULL\n" +
				"              AND pai.id_nVarEmpresa = (:idEmpresa)\n" +
				"\n" +
				"              UNION ALL\n" +
				"\n" +
				"              SELECT filho.id_nVarOrganograma, filho.id_nVarEmpresa,\n" +
				"                     filho.nVarNome, filho.nVarDescricao, filho.id_nVarPaiOrganograma,\n" +
				"              tree.OrganogramaLevel + 1\n" +
				"              FROM tbOrganograma as filho\n" +
				"              INNER JOIN organogramaEmpresa as tree\n" +
				"              ON filho.id_nVarPaiOrganograma = tree.id_nVarOrganograma\n" +
				"              WHERE filho.id_nVarPaiOrganograma IS NOT NULL\n" +
				"              AND filho.id_nVarEmpresa = (:idEmpresa)\n" +
				"            )\n" +
				"SELECT *\n" +
				"FROM organogramaEmpresa;")
				.setParameter("idEmpresa", idEmpresa);
		List resultList = query.getResultList();
		finalizarOperacao();
		return resultList;
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
