package com.escola.api.controller;

import com.escola.api.dto.CursoDTO;
import com.escola.api.service.CursoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cursos")
@Tag(name = "Cursos", description = "API para gerenciamento de cursos")
public class CursoController {

    @Autowired
    private CursoService cursoService;

    @GetMapping
    @Operation(summary = "Listar todos os cursos")
    public ResponseEntity<List<CursoDTO>> getAllCursos() {
        List<CursoDTO> cursos = cursoService.findAll();
        return ResponseEntity.ok(cursos);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar curso por ID")
    public ResponseEntity<CursoDTO> getCursoById(@PathVariable Long id) {
        CursoDTO curso = cursoService.findById(id);
        return ResponseEntity.ok(curso);
    }

    @PostMapping
    @Operation(summary = "Criar novo curso")
    public ResponseEntity<CursoDTO> createCurso(@Valid @RequestBody CursoDTO cursoDTO) {
        CursoDTO createdCurso = cursoService.create(cursoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCurso);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar curso existente")
    public ResponseEntity<CursoDTO> updateCurso(
            @PathVariable Long id,
            @Valid @RequestBody CursoDTO cursoDTO) {
        CursoDTO updatedCurso = cursoService.update(id, cursoDTO);
        return ResponseEntity.ok(updatedCurso);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar curso")
    public ResponseEntity<Void> deleteCurso(@PathVariable Long id) {
        cursoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
