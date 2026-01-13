package com.escola.api.controller;

import com.escola.api.dto.ProfessorDTO;
import com.escola.api.service.ProfessorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/professores")
@Tag(name = "Professores", description = "API para gerenciamento de professores")
public class ProfessorController {

    @Autowired
    private ProfessorService professorService;

    @GetMapping
    @Operation(summary = "Listar todos os professores")
    public ResponseEntity<List<ProfessorDTO>> getAllProfessores() {
        List<ProfessorDTO> professores = professorService.findAll();
        return ResponseEntity.ok(professores);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar professor por ID")
    public ResponseEntity<ProfessorDTO> getProfessorById(@PathVariable Long id) {
        ProfessorDTO professor = professorService.findById(id);
        return ResponseEntity.ok(professor);
    }

    @PostMapping
    @Operation(summary = "Criar novo professor")
    public ResponseEntity<ProfessorDTO> createProfessor(@Valid @RequestBody ProfessorDTO professorDTO) {
        ProfessorDTO createdProfessor = professorService.create(professorDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProfessor);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar professor existente")
    public ResponseEntity<ProfessorDTO> updateProfessor(
            @PathVariable Long id,
            @Valid @RequestBody ProfessorDTO professorDTO) {
        ProfessorDTO updatedProfessor = professorService.update(id, professorDTO);
        return ResponseEntity.ok(updatedProfessor);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar professor")
    public ResponseEntity<Void> deleteProfessor(@PathVariable Long id) {
        professorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
