package com.escola.api.controller;

import com.escola.api.dto.AlunoDTO;
import com.escola.api.dto.TurmaDTO;
import com.escola.api.service.TurmaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/turmas")
@Tag(name = "Turmas", description = "API para gerenciamento de turmas")
public class TurmaController {

    @Autowired
    private TurmaService turmaService;

    @GetMapping
    @Operation(summary = "Listar todas as turmas")
    public ResponseEntity<List<TurmaDTO>> getAllTurmas() {
        List<TurmaDTO> turmas = turmaService.findAll();
        return ResponseEntity.ok(turmas);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar turma por ID")
    public ResponseEntity<TurmaDTO> getTurmaById(@PathVariable Long id) {
        TurmaDTO turma = turmaService.findById(id);
        return ResponseEntity.ok(turma);
    }

    @GetMapping("/{id}/alunos")
    @Operation(summary = "Listar alunos de uma turma")
    public ResponseEntity<List<AlunoDTO>> getAlunosByTurmaId(@PathVariable Long id) {
        List<AlunoDTO> alunos = turmaService.findAlunosByTurmaId(id);
        return ResponseEntity.ok(alunos);
    }

    @PostMapping
    @Operation(summary = "Criar nova turma")
    public ResponseEntity<TurmaDTO> createTurma(@Valid @RequestBody TurmaDTO turmaDTO) {
        TurmaDTO createdTurma = turmaService.create(turmaDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTurma);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar turma existente")
    public ResponseEntity<TurmaDTO> updateTurma(
            @PathVariable Long id,
            @Valid @RequestBody TurmaDTO turmaDTO) {
        TurmaDTO updatedTurma = turmaService.update(id, turmaDTO);
        return ResponseEntity.ok(updatedTurma);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar turma")
    public ResponseEntity<Void> deleteTurma(@PathVariable Long id) {
        turmaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
