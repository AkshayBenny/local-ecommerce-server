package com.akshay.localecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
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

import com.akshay.localecommerce.model.User;
import com.akshay.localecommerce.service.CartService;
import com.akshay.localecommerce.service.UserManagementService;

@RestController
@RequestMapping("adminuser/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @Autowired
    private UserManagementService userManagementService;

    @GetMapping("/get")
    public ResponseEntity<?> getCartByUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userManagementService.getUserByEmail(email);

        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        Integer userId = user.getId();

        return cartService.getCartByUserId(userId);
    }

    @PostMapping("add-product/{pid}/{quantity}")
    public ResponseEntity<String> addToUserCart(@PathVariable Integer pid, @PathVariable Integer quantity) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userManagementService.getUserByEmail(email);

        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        return cartService.addToUserCart(pid, quantity, user);
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<String> editCartById(String id) {
        return new ResponseEntity<>("Edit cart by id", HttpStatus.OK);
    }

    @DeleteMapping("remove/product/{pid}")
    public ResponseEntity<String> removeCartProduct(@PathVariable Integer pid) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userManagementService.getUserByEmail(email);
        Integer userId = user.getId();
        return cartService.removeCartItemByProductId(pid, userId);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteCartById(String id) {
        return new ResponseEntity<>("Delete cart by id", HttpStatus.OK);
    }
}