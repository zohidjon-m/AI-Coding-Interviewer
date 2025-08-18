package com.ecobridge.interviewer.repository;

import com.ecobridge.interviewer.domain.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByEmail(String email); // login / lookup

  boolean existsByEmail(String email); // fast uniqueness check

  boolean existsByEmailAndPassword(String email, String password);

  //    List<User> findByRoleOrderByCreatedAtDesc(User.Role role);    // admin screens
  List<User> findByRoleOrderByCreatedAtDesc(User.Role role); // admin screens
}
