package camada.entidade;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

import camada.dao.Dao;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tbFuncionario")
public class Funcionario extends Dao {
	
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

	@Column(name = "id_nvarEmpresa", nullable = false)
	private String idEmpresa;

	@Column(name = "id_nvarUsuario")
	private String userId;

	@JsonIgnore
	@ManyToMany(mappedBy = "funcionarios", fetch = FetchType.EAGER)
	private Set<Organograma> organogramas;

	public void salvar() {
		iniciarOperacao();
		this.setId(getSequence(this.descricao));
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
