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
@RequestMapping("order")
public class OrderController {
    @GetMapping("all/{id}")
    public ResponseEntity<String> getAllUserOrders(String id){
        return new ResponseEntity<>("Get all user orders", HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<String> getOrderById(String id) {
        return new ResponseEntity<>("Get order by id", HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> createNewOrder() {
        return new ResponseEntity<>("Create new order", HttpStatus.OK);
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<String> updateUserOrder(String id){
        return new ResponseEntity<>("Update user order", HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteOrderById(String id){
        return new ResponseEntity<>("Delete order by id", HttpStatus.OK);
    }
}