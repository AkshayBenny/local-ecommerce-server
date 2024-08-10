package com.akshay.localecommerce.repository;

import com.akshay.localecommerce.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for accessing the items linked to a particular order
 */
public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
}
