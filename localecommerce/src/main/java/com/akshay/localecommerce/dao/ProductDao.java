package com.akshay.localecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.akshay.localecommerce.model.Product;

@Repository
public interface ProductDao extends JpaRepository<Product, Integer> {
    
}
