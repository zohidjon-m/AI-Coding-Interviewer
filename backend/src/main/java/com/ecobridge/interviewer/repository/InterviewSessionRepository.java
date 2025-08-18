package com.ecobridge.interviewer.repository;

import com.ecobridge.interviewer.domain.InterviewSession;
import java.time.Instant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterviewSessionRepository extends JpaRepository<InterviewSession, Long> {
  List<InterviewSession> findByUserIdOrderByStartedAtDesc(Long userId);

  List<InterviewSession> findByUserIdAndActiveTrue(Long userId); // resume-in-progress

  long countByStartedAtAfter(Instant since); // reporting / rate-limits
}
