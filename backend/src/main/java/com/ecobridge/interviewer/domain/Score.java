package com.ecobridge.interviewer.domain;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "answer_score")
public class Score extends Auditable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(nullable = false, unique = true)
  private Answer answer;

  private Double value; // 0-100 or 0-1 depending on rubric

  @Column(columnDefinition = "TEXT")
  private String feedback; // GPT or human explanation
}
