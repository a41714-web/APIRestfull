package com.escola.api.repository;

import com.escola.api.model.Turma;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TurmaRepository extends JpaRepository<Turma, Long> {
    
    @Query("SELECT t FROM Turma t LEFT JOIN FETCH t.alunos WHERE t.id = :id")
    Turma findByIdWithAlunos(@Param("id") Long id);
}
