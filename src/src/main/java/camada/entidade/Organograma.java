package camada.entidade;

import java.util.ArrayList;
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
}
