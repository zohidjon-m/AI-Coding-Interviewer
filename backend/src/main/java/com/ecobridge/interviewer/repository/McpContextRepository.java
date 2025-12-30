package com.ecobridge.interviewer.repository;

import com.ecobridge.interviewer.domain.McpContext;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface McpContextRepository extends JpaRepository<McpContext, Long> {

  Optional<McpContext> findBySessionId(Long sessionId); // sync state

  List<McpContext> findByLastSyncBefore(Instant cutoff); // state-cleanup job
}
