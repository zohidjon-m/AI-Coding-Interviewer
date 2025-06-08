package com.ecobridge.interviewer.domain;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(indexes = @Index(name="idx_question_phase", columnList = "phase_id"))
public class Question extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Phase phase;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 40)
    private QuestionType questionType;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String prompt;

    //jsonb -> Java Map<String, Object>
    @Type(JsonType.class)                      // from hibernate-types lib
    @Column(columnDefinition = "jsonb")
    private Map<String, Object> metadata = new HashMap<>();


    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Answer> answers = new ArrayList<>();

    public enum QuestionType { CODING, SYSTEM_DESIGN, OPEN }
}
