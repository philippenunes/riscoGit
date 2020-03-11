package camada.entidade;

public class Main {

	public static void main(String[] args) {
		
		
		Empresa e = new Empresa();
		e.setId(5l);
		e.setDescricao("alou");
		e.setNome("VitorLindo");
		
		e.salvar();
		
		
	}

}
