package com.akshay.localecommerce.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.akshay.localecommerce.model.Order;

/**
 * Repository for accessing the order related a user
 */
public interface OrderRepository extends JpaRepository<Order, Integer> {
    /**
     * Finds the order related to a user by its email
     * 
     * @param email Email address of the {@link User}
     * @return {@link Order} related to a {@link User}
     */
    List<Order> findByUserEmail(String email);

    /**
     * Finds {@link Order} by its payment intent id
     * 
     * @param paymentIntentId The payment intent id
     * @return {@link Optional} containing the {@link Order} with the specified payment intent id or {@code Optional.empty()} if not found
     */
    Optional<Order> findByPaymentIntentId(String paymentIntentId);

    /**
     * Gets all  {@link Order} entities sorted by their order placement dates in descending order
     * @return List of all {@link Order} entities sorted by their order placement dates in descending order
     */
    List<Order> findAllByOrderByOrderDateDesc();
}