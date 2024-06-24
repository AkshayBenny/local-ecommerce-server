package com.akshay.localecommerce.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("product")
public class ProductController {
    @GetMapping("{id}")
    public ResponseEntity<String> getProductById(String id){
        return new ResponseEntity<>("Get Product by id", HttpStatus.OK);
    }

    @GetMapping("all")
    public ResponseEntity<String> getAllProducts() {
        return new ResponseEntity<>("Get all products", HttpStatus.OK);
    }
}
