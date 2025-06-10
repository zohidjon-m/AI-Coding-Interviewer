package com.ecobridge.interviewer.domain;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

import java.time.Instant;
import java.util.*;


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

    @Column(name="turn_counter", nullable = false)
    private long turnCounter = 0L;


    // ------------------------------------------------------------
    // Static factory – first context snapshot for a new session
    // ------------------------------------------------------------
    public static McpContext start(InterviewSession session,
                                   Phase phase,
                                   Question question) {

        Objects.requireNonNull(session,  "session must not be null");
        Objects.requireNonNull(phase,    "phase must not be null");
        Objects.requireNonNull(question, "question must not be null");

        McpContext ctx = new McpContext();
        ctx.session = session;

        // Seed the chat / state history however you like
        Map<String, Object> history = new LinkedHashMap<>();
        history.put("phase",  phase.getPhaseType().name());
        history.put("prompt", question.getPrompt());
        ctx.state.put("history", List.of(history));

        ctx.turnCounter = 0;
        return ctx;
    }

    // Convenience for later chat turns
    public void append(Phase phase, Question question) {
        List<Map<String, Object>> history = (List<Map<String, Object>>) state
                .computeIfAbsent("history", k -> new ArrayList<>());

        history.add(Map.of(
                "phase",  phase.getPhaseType().name(),
                "prompt", question.getPrompt()
        ));
        turnCounter++;
    }
}

