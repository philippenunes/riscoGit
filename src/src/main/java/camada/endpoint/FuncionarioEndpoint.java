package camada.endpoint;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import camada.entidade.Funcionario;


@RestController
@CrossOrigin
@RequestMapping(value = "/funcionario")
public class FuncionarioEndpoint {
	
	
	@GetMapping
	public ResponseEntity<List<Funcionario>> findAll(){
		Funcionario funcionario = new Funcionario();
		List<Funcionario> listaFuncionario = new ArrayList<Funcionario>();
		listaFuncionario.addAll(funcionario.findAll());
		
		return new ResponseEntity<List<Funcionario>>(listaFuncionario, HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Funcionario> insert(@RequestBody Funcionario funcionario){

		funcionario.salvar(); 
		
		return new ResponseEntity<Funcionario>(funcionario, HttpStatus.OK);
	}
	
	@DeleteMapping
	public ResponseEntity<Funcionario> delete(@RequestBody Funcionario funcionario){
		
		funcionario.deletar();
		
		return new ResponseEntity<Funcionario>(funcionario, HttpStatus.OK);
	}
	
	@PutMapping
	public ResponseEntity<Funcionario> atualizar(@RequestBody Funcionario funcionario){
		
		funcionario.atualizar();
		
		return new ResponseEntity<Funcionario>(funcionario, HttpStatus.OK);
	}
//	
//	@GetMapping(value = "/{nome}")
//	public ResponseEntity<Funcionario> findByNome(@PathVariable(name = "nome") String nome){
//		Funcionario empresa = new Funcionario();
//		empresa.setNome(nome);
//		
//		
//		return new ResponseEntity<Funcionario>(empresa.findByNome(), HttpStatus.OK);
//	}
}
