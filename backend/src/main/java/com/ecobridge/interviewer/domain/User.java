package com.ecobridge.interviewer.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
        name="users",
        uniqueConstraints = @UniqueConstraint(name="uk_user_email", columnNames = "email"),
        indexes = @Index(name="idx_user_email", columnList = "email")
)
public class User extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 160)
    private String email;

    @Column(nullable = false, length = 120)
    private String fullName;

    @Column(nullable = false, length = 120)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 40)
    private Role role; // candidate, admin ..

    // ---------- RELATIONS ----------
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference          // prevent infinite recursion on serialization
    private List<InterviewSession> sessions = new ArrayList<>();

    public enum Role { CANDIDATE, ADMIN }


}
