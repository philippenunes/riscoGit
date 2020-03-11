package camada.entidade;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import camada.dao.Dao;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tbFuncionario")
public class Funcionario extends Dao{
	
	@Id
	@PrimaryKeyJoinColumn
	@Column(name = "id_nVarFuncionario", nullable = false)
	private long id;
	
	@Column(name = "nVarNome", nullable = false)
	private String nome;
	
	@Column(name = "nVarEmail", nullable = false)
	private String email;
	
	@Column(name = "nVarDescricao", nullable = false)
	private String descricao;
	
	@ManyToMany
	@JoinTable(name = "tbFuncionarioOrganograma",
            joinColumns={@JoinColumn(name="id_nVarFuncionario",  
            referencedColumnName="id_nVarFuncionario")},  
            inverseJoinColumns={@JoinColumn(name="id_nVarOrganograma",   
            referencedColumnName="id_nVarOrganograma")})
	private Set<Organograma> organogramas;
	
	
	public void salvar() {
		
		iniciarOperacao();
		
		//workaround para tratar recursividade da relacao bi-lateral
		for(Organograma orga : organogramas) {
			
			orga.setFuncionarios(null);
		
		}	
		
		session.save(this);
		
		finalizarOperacao();
		
	} 
	
	
}
