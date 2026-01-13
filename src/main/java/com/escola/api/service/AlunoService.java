package com.escola.api.service;

import com.escola.api.dto.AlunoDTO;
import com.escola.api.exception.ResourceNotFoundException;
import com.escola.api.exception.EmailAlreadyExistsException;
import com.escola.api.model.Aluno;
import com.escola.api.model.Turma;
import com.escola.api.repository.AlunoRepository;
import com.escola.api.repository.TurmaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private TurmaRepository turmaRepository;

    @Transactional(readOnly = true)
    public List<AlunoDTO> findAll() {
        return alunoRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AlunoDTO findById(Long id) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado com ID: " + id));
        return convertToDTO(aluno);
    }

    @Transactional
    public AlunoDTO create(AlunoDTO alunoDTO) {
        if (alunoRepository.existsByEmail(alunoDTO.getEmail())) {
            throw new EmailAlreadyExistsException("Email já registado: " + alunoDTO.getEmail());
        }
        
        Aluno aluno = convertToEntity(alunoDTO);
        Aluno savedAluno = alunoRepository.save(aluno);
        return convertToDTO(savedAluno);
    }

    @Transactional
    public AlunoDTO update(Long id, AlunoDTO alunoDTO) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado com ID: " + id));

        // Verificar se o email já existe para outro aluno
        if (!aluno.getEmail().equals(alunoDTO.getEmail()) && 
            alunoRepository.existsByEmail(alunoDTO.getEmail())) {
            throw new EmailAlreadyExistsException("Email já registado: " + alunoDTO.getEmail());
        }

        aluno.setNome(alunoDTO.getNome());
        aluno.setIdade(alunoDTO.getIdade());
        aluno.setEmail(alunoDTO.getEmail());

        if (alunoDTO.getTurmaId() != null) {
            Turma turma = turmaRepository.findById(alunoDTO.getTurmaId())
                    .orElseThrow(() -> new ResourceNotFoundException("Turma não encontrada com ID: " + alunoDTO.getTurmaId()));
            aluno.setTurma(turma);
        } else {
            aluno.setTurma(null);
        }

        Aluno updatedAluno = alunoRepository.save(aluno);
        return convertToDTO(updatedAluno);
    }

    @Transactional
    public void delete(Long id) {
        if (!alunoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Aluno não encontrado com ID: " + id);
        }
        alunoRepository.deleteById(id);
    }

    private AlunoDTO convertToDTO(Aluno aluno) {
        AlunoDTO dto = new AlunoDTO();
        dto.setId(aluno.getId());
        dto.setNome(aluno.getNome());
        dto.setIdade(aluno.getIdade());
        dto.setEmail(aluno.getEmail());
        
        if (aluno.getTurma() != null) {
            dto.setTurmaId(aluno.getTurma().getId());
            dto.setTurmaNome(aluno.getTurma().getNome());
        }
        
        return dto;
    }

    private Aluno convertToEntity(AlunoDTO dto) {
        Aluno aluno = new Aluno();
        aluno.setNome(dto.getNome());
        aluno.setIdade(dto.getIdade());
        aluno.setEmail(dto.getEmail());
        
        if (dto.getTurmaId() != null) {
            Turma turma = turmaRepository.findById(dto.getTurmaId())
                    .orElseThrow(() -> new ResourceNotFoundException("Turma não encontrada com ID: " + dto.getTurmaId()));
            aluno.setTurma(turma);
        }
        
        return aluno;
    }
}
