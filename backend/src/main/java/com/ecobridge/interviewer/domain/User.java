package com.ecobridge.interviewer.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

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

    @Enumerated(EnumType.STRING)// Hibernate passes the enum name
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)       // tell Hibernate it’s a PG enum
    @Column(columnDefinition = "role_enum", nullable = false)
    @Builder.Default
    private Role role = Role.CANDIDATE ; // candidate, admin ..

    // ---------- RELATIONS ----------
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference          // prevent infinite recursion on serialization
    private List<InterviewSession> sessions = new ArrayList<>();

    public enum Role { CANDIDATE, ADMIN }


}
