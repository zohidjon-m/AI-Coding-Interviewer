package com.ecobridge.interviewer.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Entity
@Table(
        name="users",
        uniqueConstraints = @UniqueConstraint(name="uk_user_email", columnNames = "email"),
        indexes = @Index(name="idx_user_email", columnList = "email")
)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 160)
    private String email;

    @Column(nullable = false, length = 120)
    private String fullName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 40)
    private Role role; // candidate, admin ..

    // ---------- RELATIONS ----------
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference          // prevent infinite recursion on serialization
    private List<InterviewSession> sessions = new ArrayList<>();

    public enum Role { CANDIDATE, ADMIN }


}
