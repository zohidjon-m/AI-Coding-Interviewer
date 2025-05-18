package com.ecobridge.interviewer.domain;



import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;


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
}
