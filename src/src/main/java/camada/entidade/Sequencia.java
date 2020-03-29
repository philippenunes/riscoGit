//package camada.entidade;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.Table;
//
//import camada.dao.Dao;
//import lombok.Getter;
//import lombok.Setter;
//
//@Getter
//@Setter
//@Entity
//@Table(name = "tbSequencia")
//public class Sequencia extends Dao{
//
//	@Id
//	@GeneratedValue(strategy=GenerationType.IDENTITY)
//	@Column(name = "id_sequencia", nullable = false)
//	private int id;
//	
//	@Column(name = "Valor", nullable = false)
//	private int valor;
//	
//	
//	public int buscarNextId(){
//		
//		iniciarOperacao();
//		
//		this.setId(session.createQuery("SELECT max(a) FROM Sequencia a", Sequencia.class).getFirstResult());
//		
//		finalizarOperacao();
//		
//		this.setId(id+1);
//		
//		incrementarId();
//		
//		return id;
//	}
//	
//	private void incrementarId() {
//		
//		iniciarOperacao();
//		
//		session.save(this);
//		
//		finalizarOperacao();
//	}
//}
