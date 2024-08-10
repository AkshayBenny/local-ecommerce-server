package com.akshay.localecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.akshay.localecommerce.model.CartItem;

/**
 * Repository for accessing {@link CartItem}
 */
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    
}
