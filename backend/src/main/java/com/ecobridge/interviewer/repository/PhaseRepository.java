package com.ecobridge.interviewer.repository;


import com.ecobridge.interviewer.domain.Phase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PhaseRepository extends JpaRepository<Phase, Long>
{
    List<Phase> findBySessionIdOrderByOrderAsc(Long sessionId);    // render interview flow
    Optional<Phase> findFirstBySessionIdAndTitle(Long sessionId, String title);
}
