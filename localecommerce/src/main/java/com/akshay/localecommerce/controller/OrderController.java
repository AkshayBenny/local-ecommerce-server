package com.akshay.localecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.akshay.localecommerce.service.OrderService;
import org.springframework.security.core.Authentication;

/**
 * REST controller to manage orders placed by the user
 */
@RestController
@RequestMapping("adminuser/order")
public class OrderController {
    @Autowired
    OrderService orderService;

    /**
     * Gets all the orders associated with a user
     * 
     * @return {@link ResponseEntity} containing a list of the all orders
     */
    @GetMapping("/all")
    public ResponseEntity<?> getAllUserOrders() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return orderService.getAllOrdersByUserEmail(email);
    }

    /**
     * Get a user order by id
     * 
     * @param orderId id of the order
     * @return {@link ResponseEntity} containing the order entity or null
     */
    @GetMapping("{orderId}")
    public ResponseEntity<?> getOrderById(@PathVariable Integer orderId) {
        return orderService.getOrderById(orderId);
    }

    /**
     * Creates a new order
     * 
     * @return {@link ResponseEntity} message showing the result of this operation
     */
    @PostMapping("/create")
    public ResponseEntity<String> createOrder() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return orderService.createOrder(email);
    }

}