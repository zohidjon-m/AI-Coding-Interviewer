package com.ecobridge.interviewer.repository;

import com.ecobridge.interviewer.domain.Question;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

  List<Question> findByPhaseIdOrderById(Long phaseId); // show all Qs in a phase

  List<Question> findByPhaseIdAndQuestionType(
      Long phaseId, Question.QuestionType type); // branching logic
}
