package camada.entidade;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tbFornecedorExterno")
public class FornecedorExterno {

	@Id
	@PrimaryKeyJoinColumn
	@Column(name = "id_nVarOrganograma", nullable = false)
	private long id;
	
	@Column(name = "nVarNome", nullable = false)
	private String nome;
	
	@Column(name = "nVarDescricao", nullable = false)
	private String descricao;
	
	@ManyToMany(mappedBy = "fornecedoresExternos")
	private Set<Processo> processos;
}

