package br.com.fiap.taskmanager.controller;

import br.com.fiap.taskmanager.model.Categoria;
import br.com.fiap.taskmanager.model.Tarefa;
import br.com.fiap.taskmanager.repository.CategoriaRepository;
import br.com.fiap.taskmanager.repository.TarefaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tarefas")
public class TarefaController {

    private final TarefaRepository tarefaRepository;
    private final CategoriaRepository categoriaRepository;

    public TarefaController(TarefaRepository tarefaRepository, CategoriaRepository categoriaRepository) {
        this.tarefaRepository = tarefaRepository;
        this.categoriaRepository = categoriaRepository;
    }

    @PostMapping
    public ResponseEntity<Tarefa> criarTarefa(@RequestBody Tarefa tarefa) {
        String nomeCategoria = tarefa.getCategoria().getNome();
        Categoria categoriaExistente = categoriaRepository.findByNome(nomeCategoria)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada: " + nomeCategoria));

        tarefa.setCategoria(categoriaExistente);
        return ResponseEntity.ok(tarefaRepository.save(tarefa));
    }

    @GetMapping
    public List<Tarefa> listarTarefas() {
        return tarefaRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirTarefa(@PathVariable Long id) {
        if (tarefaRepository.existsById(id)) {
            tarefaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
