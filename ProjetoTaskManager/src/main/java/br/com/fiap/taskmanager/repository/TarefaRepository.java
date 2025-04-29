package br.com.fiap.taskmanager.repository;

import br.com.fiap.taskmanager.model.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
}
