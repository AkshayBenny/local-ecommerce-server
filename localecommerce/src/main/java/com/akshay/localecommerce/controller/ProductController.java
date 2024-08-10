package com.akshay.localecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.akshay.localecommerce.model.Product;
import com.akshay.localecommerce.service.ProductService;

/**
 * REST controller to manage products
 */
@RestController
@RequestMapping("public/product")
public class ProductController {
    @Autowired
    ProductService productService;

    /**
     * Get a product by its id
     * 
     * @param id product id
     * @return {@link ResponseEntity} A product entity if its found else return null
     */
    @GetMapping("find/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        return productService.getProductById(id);
    }

    /**
     * Get a list of all products
     */
    @GetMapping("all")
    public ResponseEntity<List<Product>> getAllProducts() {
        return productService.getAllProducts();
    }
}
