package com.akshay.localecommerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.akshay.localecommerce.model.User;

/**
 * Repository to access user entities
 */
public interface UserRepository extends JpaRepository<User, Integer> {
    /**
     * Fetchs a {@link User} by their email address
     * 
     * @param email Email address of the user
     * @return {@link Optional} containing the {@link User} or
     *         {@code Optional.empty()} if not found
     */
    Optional<User> findByEmail(String email);
}
