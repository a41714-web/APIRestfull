package com.escola.api.service;

import com.escola.api.dto.CursoDTO;
import com.escola.api.exception.ResourceNotFoundException;
import com.escola.api.model.Curso;
import com.escola.api.repository.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CursoService {

    @Autowired
    private CursoRepository cursoRepository;

    @Transactional(readOnly = true)
    public List<CursoDTO> findAll() {
        return cursoRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CursoDTO findById(Long id) {
        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Curso não encontrado com ID: " + id));
        return convertToDTO(curso);
    }

    @Transactional
    public CursoDTO create(CursoDTO cursoDTO) {
        Curso curso = convertToEntity(cursoDTO);
        Curso savedCurso = cursoRepository.save(curso);
        return convertToDTO(savedCurso);
    }

    @Transactional
    public CursoDTO update(Long id, CursoDTO cursoDTO) {
        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Curso não encontrado com ID: " + id));

        curso.setNome(cursoDTO.getNome());
        curso.setDuracao(cursoDTO.getDuracao());

        Curso updatedCurso = cursoRepository.save(curso);
        return convertToDTO(updatedCurso);
    }

    @Transactional
    public void delete(Long id) {
        if (!cursoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Curso não encontrado com ID: " + id);
        }
        cursoRepository.deleteById(id);
    }

    private CursoDTO convertToDTO(Curso curso) {
        CursoDTO dto = new CursoDTO();
        dto.setId(curso.getId());
        dto.setNome(curso.getNome());
        dto.setDuracao(curso.getDuracao());
        return dto;
    }

    private Curso convertToEntity(CursoDTO dto) {
        Curso curso = new Curso();
        curso.setNome(dto.getNome());
        curso.setDuracao(dto.getDuracao());
        return curso;
    }
}
