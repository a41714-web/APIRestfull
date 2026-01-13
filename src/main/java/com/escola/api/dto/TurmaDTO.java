package com.escola.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.List;

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

    public TurmaDTO() {
    }

    public TurmaDTO(Long id, String nome, Long cursoId, String cursoNome, Long professorId, String professorNome, List<AlunoDTO> alunos) {
        this.id = id;
        this.nome = nome;
        this.cursoId = cursoId;
        this.cursoNome = cursoNome;
        this.professorId = professorId;
        this.professorNome = professorNome;
        this.alunos = alunos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getCursoId() {
        return cursoId;
    }

    public void setCursoId(Long cursoId) {
        this.cursoId = cursoId;
    }

    public String getCursoNome() {
        return cursoNome;
    }

    public void setCursoNome(String cursoNome) {
        this.cursoNome = cursoNome;
    }

    public Long getProfessorId() {
        return professorId;
    }

    public void setProfessorId(Long professorId) {
        this.professorId = professorId;
    }

    public String getProfessorNome() {
        return professorNome;
    }

    public void setProfessorNome(String professorNome) {
        this.professorNome = professorNome;
    }

    public List<AlunoDTO> getAlunos() {
        return alunos;
    }

    public void setAlunos(List<AlunoDTO> alunos) {
        this.alunos = alunos;
    }
}
