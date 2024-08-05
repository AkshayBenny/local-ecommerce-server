package com.akshay.localecommerce.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.akshay.localecommerce.model.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUserEmail(String email);

    Optional<Order> findByPaymentIntentId(String paymentIntentId);
}