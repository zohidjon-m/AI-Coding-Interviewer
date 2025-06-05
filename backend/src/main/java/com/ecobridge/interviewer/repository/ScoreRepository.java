package com.ecobridge.interviewer.repository;


import com.ecobridge.interviewer.domain.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {

    List<Score> findByAnswerId(Long answerId);              // detail view
    Optional<Score> findByAnswerIdAndRubric(Long answerId, String rubric);   //rubric-specific

}