package camada.entidade;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GenerationType;
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
		if(organogramas != null) {
			for(Organograma orga : organogramas) {
				orga.setFuncionarios(null);
			}	
		}
		
		session.save(this);
		
		finalizarOperacao();
		
	} 
	
	public void deletar(){	
		
		iniciarOperacao();
		Funcionario funcionario = (Funcionario)session.load(Funcionario.class, this.id);
		session.delete(funcionario);
		
		finalizarOperacao();
		
	}
	
	public List<Funcionario> findAll(){
		
		iniciarOperacao();
		
		List<Funcionario> listaFuncionarios = new ArrayList<Funcionario>();
		listaFuncionarios = session.createQuery("SELECT a FROM Funcionario a", Funcionario.class).getResultList();
		
		finalizarOperacao();
		
		return listaFuncionarios;
	}

	public void atualizar() {
		
		iniciarOperacao();
		
		session.update(this);
		
		finalizarOperacao();
		
	}
	
	
}
