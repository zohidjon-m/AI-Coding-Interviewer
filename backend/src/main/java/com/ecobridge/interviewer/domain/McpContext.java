package com.ecobridge.interviewer.domain;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

import java.time.Instant;
import java.util.Map;


@Getter @Builder
@AllArgsConstructor @NoArgsConstructor
@Entity
@Table(indexes = @Index(name="idx_mcp_session", columnList = "session_id"))
public class McpContext extends Auditable {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY) @JoinColumn(nullable=false, unique=true)
    private InterviewSession session;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb", nullable=false)
    private Map<String, Object> state;    // exactly what the MCP server/client returned

    private Instant lastSync;
}

