package camada.entidade;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "tbProcesso")
public class Processo {

	@Id
	@PrimaryKeyJoinColumn
	@Column(name = "id_nVarProcesso", nullable = false)
	private long id;
	
	@Column(name = "nVarMacroProcesso", nullable = false)	
	private String macroProcesso;
	
	@Column(name = "nVarNomeProcesso", nullable = false)
	private String nomeProcesso;
	
	@Column(name = "nVarObjetivoProcesso", nullable = false)
	private String objetivoProcesso;
	
	@Column(name = "id_nVarOrganograma", nullable = false)
	private Organograma organograma;
	
	@Column(name = "nVarLimitrofeInicial", nullable = false)
	private String limitrofeInicial;
	
	@Column(name = "nVarLimitrofeFinal", nullable = false)
	private String limitrofeFinal;
	
	@Column(name = "nVarPathFile", nullable = false)
	private String pathFile;	
	
	@Column(name = "nVarEntradas", nullable = false)
	private String entradas;	
	
	@Column(name = "nVarSaidas", nullable = false)
	private String saidas;
	
	@Column(name = "dtInicio", nullable = false)
	private Date dtInicio;
	
	@Column(name = "dtFim", nullable = false)
	private Date dtFim;
	
	@ManyToMany
	@JoinTable(name = "tbClienteExternoProcesso",
            joinColumns={@JoinColumn(name="id_nVarProcesso",  
            referencedColumnName="id_nVarProcesso")},  
            inverseJoinColumns={@JoinColumn(name="id_nVarClienteExterno",   
            referencedColumnName="id_nVarClienteExterno")})
	private Set<ClienteExterno> clienteExternos;
	
	@ManyToMany
	@JoinTable(name = "tbComplianceExternoProcesso",
            joinColumns={@JoinColumn(name="id_nVarProcesso",  
            referencedColumnName="id_nVarProcesso")},  
            inverseJoinColumns={@JoinColumn(name="id_nVarComplianceExterno",   
            referencedColumnName="id_nVarComplianceExterno")})
	private Set<ComplianceExterno> complianceExternos;
	
	@ManyToMany
	@JoinTable(name = "tbFornecedorExternoProcesso",
            joinColumns={@JoinColumn(name="id_nVarProcesso",  
            referencedColumnName="id_nVarProcesso")},  
            inverseJoinColumns={@JoinColumn(name="id_nVarFornecedorExterno",   
            referencedColumnName="id_nVarFornecedorExterno")})
	private Set<FornecedorExterno> fornecedoresExternos;
	
	@ManyToMany
	@JoinTable(name = "tbComplianceInternoProcesso",
            joinColumns={@JoinColumn(name="id_nVarProcesso",  
            referencedColumnName="id_nVarProcesso")},  
            inverseJoinColumns={@JoinColumn(name="id_nVarComplianteInterno",   
            referencedColumnName="id_nVarComplianteInterno")})
	private Set<ComplianceInterno> complianceInternos;
}

