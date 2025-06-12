package com.ecobridge.interviewer.domain;


import com.fasterxml.jackson.annotation.JsonManagedReference;
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
        @Index(name="idx_session_user_active", columnList = "user_id,active")
})
public class InterviewSession extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // who owns this session
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(nullable=false)
    @JsonManagedReference
    private User user;

    @Builder.Default            // default true when new
    private Boolean active = true;

    private Instant startedAt;
    private Instant endedAt;

    /* -------------- NEW: SESSION PREFERENCES -------------- */
    @Embedded
    private SessionPreferences preferences;

    // ---------- RELATIONS ----------
    @OneToOne(mappedBy = "session", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private McpContext mcpContext;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Phase> phases = new ArrayList<>();

    public static InterviewSession of(User user,
                                      SessionPreferences prefs,
                                      Instant start) {

        return InterviewSession.builder()
                .user(user)
                .preferences(prefs)
                .startedAt(start)
                .active(true)
                .build();
    }

}
