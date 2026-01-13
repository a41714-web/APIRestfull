package com.escola.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TurmaDTO {
    
    private Long id;
    
    @NotBlank(message = "Nome é obrigatório")
    private String nome;
    
    @NotNull(message = "Curso é obrigatório")
    private Long cursoId;
    private String cursoNome;
    
    @NotNull(message = "Professor responsável é obrigatório")
    private Long professorId;
    private String professorNome;
    
    private List<AlunoDTO> alunos = new ArrayList<>();
}
