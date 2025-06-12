package com.ecobridge.interviewer.domain;



import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;


@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(indexes = @Index(name="idx_answer_question", columnList = "question_id"))
public class Answer extends Auditable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Question question;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content; // code snippet or plain text


    private Instant submittedAt;

    @OneToOne(mappedBy = "answer", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Score score;

    // jsonb  →  Java Map<String,Object>
    @Type(JsonType.class)   // hibernate-types library
    @Column(columnDefinition = "jsonb")
    @Builder.Default
    private Map<String, Object> metadata = new HashMap<>();

    /*  Static factory – preferred creation path                          */
    /* ------------------------------------------------------------------ */
    public static Answer of(Question question, String content) {
        Answer a = new Answer();
        a.question = question;
        a.content  = content;
        a.submittedAt   = Instant.now();
        return a;
    }


}
