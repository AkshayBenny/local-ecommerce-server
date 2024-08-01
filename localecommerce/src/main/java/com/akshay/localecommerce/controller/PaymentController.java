package com.akshay.localecommerce.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("adminuser/payment")
public class PaymentController {

    @PostMapping
    public ResponseEntity<String> createPayment() {
        return new ResponseEntity<>("success", HttpStatus.OK);
    }
}
