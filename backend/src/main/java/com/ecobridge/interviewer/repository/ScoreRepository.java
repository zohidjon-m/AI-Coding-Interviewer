package com.ecobridge.interviewer.repository;

import com.ecobridge.interviewer.domain.Score;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {

  List<Score> findByAnswerId(Long answerId); // detail view

  Optional<Score> findByAnswerIdAndFeedback(Long answerId, String rubric); // rubric-specific
}
