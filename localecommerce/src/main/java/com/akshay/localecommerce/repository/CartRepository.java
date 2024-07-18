package com.akshay.localecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.akshay.localecommerce.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    Cart findByUserId(Integer userId);
}
