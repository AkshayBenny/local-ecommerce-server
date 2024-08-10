package com.akshay.localecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.akshay.localecommerce.model.Cart;

/**
 * Repository for accessing the {@link Cart} entity
 */
public interface CartRepository extends JpaRepository<Cart, Integer> {
    /**
     * Fetch the {@link Cart} by user's id
     * 
     * @param userId user id of the user
     * @return {@link Cart} linked to a specific user id or {@code null} if not
     *         found
     */
    Cart findByUserId(Integer userId);

    /**
     * Fetches a {@link Cart} by the user's email
     * 
     * @param email Email address of the user
     * @return {@link Cart} linked to a specific user email or {@code null} if not
     *         found
     */
    Cart findByUserEmail(String email);
}
