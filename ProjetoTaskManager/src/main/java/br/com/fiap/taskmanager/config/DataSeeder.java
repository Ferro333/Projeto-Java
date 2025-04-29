package br.com.fiap.taskmanager.config;

import br.com.fiap.taskmanager.model.Categoria;
import br.com.fiap.taskmanager.repository.CategoriaRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder {

    private final CategoriaRepository categoriaRepository;

    public DataSeeder(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    @PostConstruct
    public void seedDatabase() {
        if (categoriaRepository.count() == 0) {
            List<Categoria> categoriasPadrao = List.of(
                new Categoria("Saúde"),
                new Categoria("Trabalho"),
                new Categoria("Estudo"),
                new Categoria("Emergências")
            );

            categoriaRepository.saveAll(categoriasPadrao);
            System.out.println("✅ Categorias padrão adicionadas ao banco de dados.");
        } else {
            System.out.println("📌 Categorias já existem. Seeder não necessário.");
        }
    }
}
