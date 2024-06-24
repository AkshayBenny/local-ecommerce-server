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
@RequestMapping("cart")
public class CartController {
    @GetMapping("{id}")
    public ResponseEntity<String> getCartById(String id){
        return new ResponseEntity<>("Get my cart", HttpStatus.OK);
    }

    @PostMapping("create")
    public ResponseEntity<String> createCart(){
        return new ResponseEntity<>("Create cart", HttpStatus.OK);
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<String> editCartById(String id) {
        return new ResponseEntity<>("Edit cart by id", HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteCartById(String id){
        return new ResponseEntity<>("Delete cart by id", HttpStatus.OK);
    }
}