package br.com.fiap.taskmanager.controller;

import jakarta.validation.Valid;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.fiap.taskmanager.model.Categoria;
import br.com.fiap.taskmanager.repository.CategoriaRepository;

import java.util.List;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    private final CategoriaRepository repository;

    public CategoriaController(CategoriaRepository repository) {
        this.repository = repository;
    }

    @Cacheable("categorias")
    @GetMapping
    public List<Categoria> listarCategorias() {
        System.out.println("Buscando categorias do banco...");
        return repository.findAll();
    }

    @PostMapping
    @CacheEvict(value = "categorias", allEntries = true)
    public ResponseEntity<Categoria> adicionarCategoria(@Valid @RequestBody Categoria categoria) {
        return ResponseEntity.ok(repository.save(categoria));
    }

    @PutMapping("/{id}")
    @CacheEvict(value = "categorias", allEntries = true)
    public ResponseEntity<Categoria> editarCategoria(@PathVariable Long id, @Valid @RequestBody Categoria categoriaAtualizada) {
        return repository.findById(id)
                .map(categoria -> {
                    categoria.setNome(categoriaAtualizada.getNome());
                    return ResponseEntity.ok(repository.save(categoria));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @CacheEvict(value = "categorias", allEntries = true)
    public ResponseEntity<Void> excluirCategoria(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
