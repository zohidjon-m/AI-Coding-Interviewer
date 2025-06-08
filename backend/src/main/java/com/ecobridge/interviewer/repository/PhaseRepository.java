package com.ecobridge.interviewer.repository;


import com.ecobridge.interviewer.domain.Phase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PhaseRepository extends JpaRepository<Phase, Long>
{
    List<Phase> findBySessionIdOrderByPhaseTypeAsc(Long sessionId);    // render interview flow
    Phase findTopBySessionIdOrderByIdDesc(Long sessionId);
//    Optional<Phase> findFirstBySessionIdAndTitle(Long sessionId, String title);
}
