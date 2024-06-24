package com.akshay.localecommerce.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("admin")
public class AdminController {
    @GetMapping("order/all")
    public ResponseEntity<String> getAllUsersOrders() {
        return new ResponseEntity<>("All users orders", HttpStatus.OK);
    }

    @PostMapping("product/new")
    public ResponseEntity<String> createProduct() {
        return new ResponseEntity<>("Create new product", HttpStatus.OK);
    }

    @PutMapping("product/edit/{id}")
    public ResponseEntity<String> editProductById(String id){
        return new ResponseEntity<>("Edit product", HttpStatus.OK);
    }

    @DeleteMapping("product/delete/{id}")
    public ResponseEntity<String> deleteProductById(String id){
        return new ResponseEntity<>("Delete product by id", HttpStatus.OK);
    }


}
