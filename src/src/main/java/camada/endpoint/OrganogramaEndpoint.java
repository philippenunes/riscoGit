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

import camada.entidade.Empresa;
import camada.entidade.Organograma;


@RestController
@CrossOrigin
@RequestMapping(value = "/organograma")
public class OrganogramaEndpoint {

	@GetMapping
	public ResponseEntity<List<Organograma>> findOrganogramaPorEmpresa(@RequestBody Empresa empresa){
		Organograma	organograma = new Organograma();
		List<Organograma> listaOrganograma = new ArrayList<Organograma>();
		listaOrganograma.addAll(organograma.findOrganogramaPorEmpresa(empresa));
		
		return new ResponseEntity<List<Organograma>>(listaOrganograma, HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Organograma> insert(@RequestBody Organograma organograma){
		organograma.salvar(); 
		return new ResponseEntity<Organograma>(organograma, HttpStatus.OK);
	}
	
	@DeleteMapping
	public ResponseEntity<String> iniciarDelete(@RequestBody Organograma organograma){
		return new ResponseEntity<String>(organograma.iniciarDelete(), HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/deletar")
	public ResponseEntity<Organograma> deletar(@RequestBody Organograma organograma){
		organograma.deletar();
		return new ResponseEntity<Organograma>(organograma, HttpStatus.OK);
	}
	
	@PutMapping
	public ResponseEntity<Organograma> atualizar(@RequestBody Organograma organograma){
		organograma.atualizar();
		return new ResponseEntity<Organograma>(organograma, HttpStatus.OK);
	}
	
	@GetMapping(value="/montarArvore")
	public ResponseEntity<String> montarArvore(@RequestBody Empresa empresa){
		Organograma	organograma = new Organograma();
		organograma.setEmpresa(empresa);
		return new ResponseEntity<String>(organograma.montarArvore(), HttpStatus.OK);
	}
}
