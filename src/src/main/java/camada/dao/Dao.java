package camada.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import camada.entidade.Empresa;
import camada.entidade.Funcionario;
import camada.entidade.Organograma;


public class Dao {

	protected static SessionFactory factory = new Configuration()
			.configure("hibernate.cfg.xml")
			.addAnnotatedClass(Funcionario.class)
			.addAnnotatedClass(Empresa.class)
			.addAnnotatedClass(Organograma.class)
//			.addAnnotatedClass(Sequencia.class)
			.buildSessionFactory();

	protected Session session = factory.getCurrentSession();
	
	
	protected  void iniciarOperacao(){
		session.beginTransaction();
	}
	
	protected  void finalizarOperacao() {
		
		session.getTransaction().commit();
		session.close();
	}
	
	
}
