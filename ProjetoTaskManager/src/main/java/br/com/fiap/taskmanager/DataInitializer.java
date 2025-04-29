package br.com.fiap.taskmanager;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import br.com.fiap.taskmanager.model.Categoria;
import br.com.fiap.taskmanager.repository.CategoriaRepository;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(CategoriaRepository categoriaRepository) {
        return args -> {
            if (categoriaRepository.count() == 0) {
                List<Categoria> categoriasPadrao = Categoria.categoriasPadrao();
                categoriaRepository.saveAll(categoriasPadrao);
            }
        };
    }
}
