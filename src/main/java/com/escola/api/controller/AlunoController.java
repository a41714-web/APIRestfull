package com.escola.api.controller;

import com.escola.api.dto.AlunoDTO;
import com.escola.api.service.AlunoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alunos")
@Tag(name = "Alunos", description = "API para gerenciamento de alunos")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @GetMapping
    @Operation(summary = "Listar todos os alunos")
    public ResponseEntity<List<AlunoDTO>> getAllAlunos() {
        List<AlunoDTO> alunos = alunoService.findAll();
        return ResponseEntity.ok(alunos);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar aluno por ID")
    public ResponseEntity<AlunoDTO> getAlunoById(@PathVariable Long id) {
        AlunoDTO aluno = alunoService.findById(id);
        return ResponseEntity.ok(aluno);
    }

    @PostMapping
    @Operation(summary = "Criar novo aluno")
    public ResponseEntity<AlunoDTO> createAluno(@Valid @RequestBody AlunoDTO alunoDTO) {
        AlunoDTO createdAluno = alunoService.create(alunoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAluno);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar aluno existente")
    public ResponseEntity<AlunoDTO> updateAluno(
            @PathVariable Long id,
            @Valid @RequestBody AlunoDTO alunoDTO) {
        AlunoDTO updatedAluno = alunoService.update(id, alunoDTO);
        return ResponseEntity.ok(updatedAluno);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar aluno")
    public ResponseEntity<Void> deleteAluno(@PathVariable Long id) {
        alunoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
