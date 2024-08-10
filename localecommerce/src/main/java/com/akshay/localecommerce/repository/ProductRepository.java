package com.akshay.localecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.akshay.localecommerce.model.Product;

/**
 * Repository for accesing product entity
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

}
