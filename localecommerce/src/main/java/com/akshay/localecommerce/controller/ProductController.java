package com.akshay.localecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.akshay.localecommerce.service.ProductService;

@RestController
@RequestMapping("product")
public class ProductController {
    @Autowired
    ProductService productService;

    @GetMapping("{id}")
    public ResponseEntity<String> getProductById(String id){
        return productService.getProductById(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("all")
    public ResponseEntity<String> getAllProducts() {
        return productService.getAllProducts();
    }
}
