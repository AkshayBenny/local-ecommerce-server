package com.akshay.localecommerce.service;

import java.util.Optional;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.akshay.localecommerce.model.Cart;
import com.akshay.localecommerce.model.Product;
import com.akshay.localecommerce.model.User;
import com.akshay.localecommerce.repository.CartRepository;
import com.akshay.localecommerce.repository.ProductRepository;
import com.akshay.localecommerce.repository.UserRepository;
import org.springframework.http.HttpStatus;

@Service
public class CartService {
    @Autowired
    CartRepository cartRepo;

    @Autowired
    UserRepository userRepo;

    @Autowired
    ProductRepository productRepo;

    public ResponseEntity<Cart> getCartByUserId(Integer userId) {
        return new ResponseEntity<>(cartRepo.findByUserId(userId), HttpStatus.OK);
    }

    public ResponseEntity<String> addToUserCart(Integer productId, User user) {
        try {
            Cart userCart = cartRepo.findByUserId(user.getId());
            if (userCart == null) {
                userCart = new Cart();
                userCart.setUser(user);
                userCart.setProducts(new ArrayList<>());
            }

            Optional<Product> product = productRepo.findById(productId);
            if (product.isPresent()) {
                if (userCart.getProducts() == null) {
                    userCart.setProducts(new ArrayList<>());
                }
                userCart.getProducts().add(product.get());
                cartRepo.save(userCart);
                return new ResponseEntity<>("Product added to cart successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Adding to cart went wrong!", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> removeCartItemByProductId(Integer productId, Integer userId) {
        try {
            Cart userCart = cartRepo.findByUserId(userId);
            userCart.setProducts(
                    userCart.getProducts().stream().filter(product -> !product.getId().equals(productId)).toList());
            cartRepo.save(userCart);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Removing from cart failed", HttpStatus.BAD_REQUEST);
    }
}
