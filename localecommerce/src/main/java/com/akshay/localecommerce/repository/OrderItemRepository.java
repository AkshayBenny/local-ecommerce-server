package com.akshay.localecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.akshay.localecommerce.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

}
