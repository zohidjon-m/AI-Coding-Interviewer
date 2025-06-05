package com.ecobridge.interviewer.repository;



import com.ecobridge.interviewer.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByPhaseIdOrderById(Long phaseId);      //show all Qs in a phase
    List<Question> findByPhaseIdAndType(Long phaseId, Question.QuestionType type);  //branching logic
 }
