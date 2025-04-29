package br.com.fiap.taskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.fiap.taskmanager.model.Categoria;

import java.util.Optional;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    Optional<Categoria> findByNome(String nome);
}
