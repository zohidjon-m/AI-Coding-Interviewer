package com.ecobridge.interviewer.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;


@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(indexes = {
        @Index(name="idx_phase_session", columnList = "session_id")
})
public class Phase extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(nullable=false)
    private InterviewSession session;

    @Enumerated(EnumType.STRING) @Column(nullable=false, length = 40)
    private PhaseType phaseType;

    private Instant openedAt;

    @OneToMany(mappedBy = "phase", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions = new ArrayList<>();

    public enum PhaseType { BASELINE, SCENARIO, ARCHITECTURE, DEEP_DIVE }
}

