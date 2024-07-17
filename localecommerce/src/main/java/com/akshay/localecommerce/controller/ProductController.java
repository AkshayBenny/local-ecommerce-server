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

@RestController
@RequestMapping("public/product")
public class ProductController {
    @Autowired
    ProductService productService;

    @GetMapping("find/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        return productService.getProductById(id);
    }

    @GetMapping("all")
    public ResponseEntity<List<Product>> getAllProducts() {
        return productService.getAllProducts();
    }
}
