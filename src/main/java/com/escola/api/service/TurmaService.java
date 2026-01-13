package com.escola.api.service;

import com.escola.api.dto.AlunoDTO;
import com.escola.api.dto.TurmaDTO;
import com.escola.api.exception.ResourceNotFoundException;
import com.escola.api.model.Curso;
import com.escola.api.model.Professor;
import com.escola.api.model.Turma;
import com.escola.api.repository.CursoRepository;
import com.escola.api.repository.ProfessorRepository;
import com.escola.api.repository.TurmaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TurmaService {

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @Transactional(readOnly = true)
    public List<TurmaDTO> findAll() {
        return turmaRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TurmaDTO findById(Long id) {
        Turma turma = turmaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Turma não encontrada com ID: " + id));
        return convertToDTO(turma);
    }

    @Transactional(readOnly = true)
    public List<AlunoDTO> findAlunosByTurmaId(Long turmaId) {
        Turma turma = turmaRepository.findByIdWithAlunos(turmaId);
        
        if (turma == null) {
            throw new ResourceNotFoundException("Turma não encontrada com ID: " + turmaId);
        }
        
        return turma.getAlunos().stream()
                .map(aluno -> {
                    AlunoDTO dto = new AlunoDTO();
                    dto.setId(aluno.getId());
                    dto.setNome(aluno.getNome());
                    dto.setIdade(aluno.getIdade());
                    dto.setEmail(aluno.getEmail());
                    dto.setTurmaId(turma.getId());
                    dto.setTurmaNome(turma.getNome());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public TurmaDTO create(TurmaDTO turmaDTO) {
        Turma turma = convertToEntity(turmaDTO);
        Turma savedTurma = turmaRepository.save(turma);
        return convertToDTO(savedTurma);
    }

    @Transactional
    public TurmaDTO update(Long id, TurmaDTO turmaDTO) {
        Turma turma = turmaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Turma não encontrada com ID: " + id));

        turma.setNome(turmaDTO.getNome());

        Curso curso = cursoRepository.findById(turmaDTO.getCursoId())
                .orElseThrow(() -> new ResourceNotFoundException("Curso não encontrado com ID: " + turmaDTO.getCursoId()));
        turma.setCurso(curso);

        Professor professor = professorRepository.findById(turmaDTO.getProfessorId())
                .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado com ID: " + turmaDTO.getProfessorId()));
        turma.setProfessorResponsavel(professor);

        Turma updatedTurma = turmaRepository.save(turma);
        return convertToDTO(updatedTurma);
    }

    @Transactional
    public void delete(Long id) {
        if (!turmaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Turma não encontrada com ID: " + id);
        }
        turmaRepository.deleteById(id);
    }

    private TurmaDTO convertToDTO(Turma turma) {
        TurmaDTO dto = new TurmaDTO();
        dto.setId(turma.getId());
        dto.setNome(turma.getNome());
        
        if (turma.getCurso() != null) {
            dto.setCursoId(turma.getCurso().getId());
            dto.setCursoNome(turma.getCurso().getNome());
        }
        
        if (turma.getProfessorResponsavel() != null) {
            dto.setProfessorId(turma.getProfessorResponsavel().getId());
            dto.setProfessorNome(turma.getProfessorResponsavel().getNome());
        }
        
        return dto;
    }

    private Turma convertToEntity(TurmaDTO dto) {
        Turma turma = new Turma();
        turma.setNome(dto.getNome());
        
        Curso curso = cursoRepository.findById(dto.getCursoId())
                .orElseThrow(() -> new ResourceNotFoundException("Curso não encontrado com ID: " + dto.getCursoId()));
        turma.setCurso(curso);
        
        Professor professor = professorRepository.findById(dto.getProfessorId())
                .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado com ID: " + dto.getProfessorId()));
        turma.setProfessorResponsavel(professor);
        
        return turma;
    }
}
