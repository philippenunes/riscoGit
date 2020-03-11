package camada.entidade;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import camada.dao.Dao;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tbEmpresa")
public class Empresa extends Dao {

	@Id
	@PrimaryKeyJoinColumn
	@Column(name = "id_nVarEmpresa", nullable = false)
	private long id;
	
	@Column(name = "nVarNome", nullable = false)
	private String nome;
	
	@Column(name = "nVarDescricao", nullable = false)
	private String descricao;
	
//	@OneToMany(mappedBy = "empresa", targetEntity = Organograma.class, fetch = FetchType.LAZY)
//	private Set<Organograma> organogramas;
	
	public void salvar() {
		
		iniciarOperacao();
		
		session.save(this);
		
		finalizarOperacao();
	
	} 
	
	public List<Empresa> findAll(){
		iniciarOperacao();
		
		List<Empresa> listaEmpresas = new ArrayList<Empresa>();
		listaEmpresas = session.createQuery("SELECT a FROM Empresa a", Empresa.class).getResultList();
		
		finalizarOperacao();
		
		return listaEmpresas;
	}
	
	public void deletar(){
		
		iniciarOperacao();
		Empresa empresa = (Empresa)session.load(Empresa.class, this.id);
		session.delete(empresa);
		
		finalizarOperacao();
		
	}
	
	public void atualizar(){
		
		iniciarOperacao();
		
		session.update(this);
		
		finalizarOperacao();
		
	}
	
	public Empresa findByNome(){
		
		iniciarOperacao();
		
		Empresa empresa = session.createQuery("SELECT a FROM Empresa a Where a.nome ='"+ this.nome+"'", Empresa.class).getResultList().get(0);
		
		finalizarOperacao();
		
		return empresa;
		
	}
}
