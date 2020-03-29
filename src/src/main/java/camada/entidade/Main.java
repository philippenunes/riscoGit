package camada.entidade;

public class Main {

	public static void main(String[] args) {
		
		
//		Cadastra empresa
		
		Empresa e = new Empresa();
		e.setId(7l);
		e.setDescricao("alou");
		e.setNome("VitorLindo");
		
		e.salvar();
		
//      Cadastra organograma
		
		Organograma o = new Organograma();
		o.setId(2l);
		o.setEmpresa(e);
		o.setNome("Gerente Projeto");
		o.setDescricao("Alou");
		o.setIdPaiOrganograma(1l);
		
		o.salvar();	
		
//		Cadastra funcionario : associa ao organograma
		
		Funcionario f = new Funcionario();
		f.setDescricao("Alfredo é perneta");
		f.setNome("Alfredo");
		f.setEmail("alfredo.gomes@gmail.com");
		f.set
		
		}

}
