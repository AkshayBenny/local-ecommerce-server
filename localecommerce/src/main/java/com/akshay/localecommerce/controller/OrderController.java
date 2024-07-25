package com.akshay.localecommerce.controller;

import org.hibernate.mapping.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.akshay.localecommerce.dto.OrderItemDTO;
import com.akshay.localecommerce.service.OrderService;

import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("order")
public class OrderController {
    @Autowired
    OrderService orderService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllUserOrders() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return orderService.getAllOrdersByUserEmail(email);
    }

    @GetMapping("{orderId}")
    public ResponseEntity<?> getOrderById(@PathVariable Integer orderId) {
        return orderService.getOrderById(orderId);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createOrder() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return orderService.createOrder(email);
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<String> updateUserOrder(String id) {
        return new ResponseEntity<>("Update user order", HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteOrderById(String id) {
        return new ResponseEntity<>("Delete order by id", HttpStatus.OK);
    }
}