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
@Table(name = "tbComplianceInterno")
public class ComplianceInterno {

	@Id
	@PrimaryKeyJoinColumn
	@Column(name = "id_nVarComplianteInterno", nullable = false)
	private long id;
	
	@Column(name = "nVarNome", nullable = false)
	private String nome;
	
	@Column(name = "nVarDescricao", nullable = false)
	private String descricao;
	
	@ManyToMany(mappedBy = "complianceInternos")
	private Set<Processo> processos;
}