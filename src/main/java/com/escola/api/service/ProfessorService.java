package com.escola.api.service;

import com.escola.api.dto.ProfessorDTO;
import com.escola.api.exception.ResourceNotFoundException;
import com.escola.api.exception.EmailAlreadyExistsException;
import com.escola.api.model.Professor;
import com.escola.api.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    @Transactional(readOnly = true)
    public List<ProfessorDTO> findAll() {
        return professorRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProfessorDTO findById(Long id) {
        Professor professor = professorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado com ID: " + id));
        return convertToDTO(professor);
    }

    @Transactional
    public ProfessorDTO create(ProfessorDTO professorDTO) {
        if (professorRepository.existsByEmail(professorDTO.getEmail())) {
            throw new EmailAlreadyExistsException("Email já registado: " + professorDTO.getEmail());
        }
        
        Professor professor = convertToEntity(professorDTO);
        Professor savedProfessor = professorRepository.save(professor);
        return convertToDTO(savedProfessor);
    }

    @Transactional
    public ProfessorDTO update(Long id, ProfessorDTO professorDTO) {
        Professor professor = professorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado com ID: " + id));

        // Verificar se o email já existe para outro professor
        if (!professor.getEmail().equals(professorDTO.getEmail()) && 
            professorRepository.existsByEmail(professorDTO.getEmail())) {
            throw new EmailAlreadyExistsException("Email já registado: " + professorDTO.getEmail());
        }

        professor.setNome(professorDTO.getNome());
        professor.setDisciplina(professorDTO.getDisciplina());
        professor.setEmail(professorDTO.getEmail());

        Professor updatedProfessor = professorRepository.save(professor);
        return convertToDTO(updatedProfessor);
    }

    @Transactional
    public void delete(Long id) {
        if (!professorRepository.existsById(id)) {
            throw new ResourceNotFoundException("Professor não encontrado com ID: " + id);
        }
        professorRepository.deleteById(id);
    }

    private ProfessorDTO convertToDTO(Professor professor) {
        ProfessorDTO dto = new ProfessorDTO();
        dto.setId(professor.getId());
        dto.setNome(professor.getNome());
        dto.setDisciplina(professor.getDisciplina());
        dto.setEmail(professor.getEmail());
        return dto;
    }

    private Professor convertToEntity(ProfessorDTO dto) {
        Professor professor = new Professor();
        professor.setNome(dto.getNome());
        professor.setDisciplina(dto.getDisciplina());
        professor.setEmail(dto.getEmail());
        return professor;
    }
}
