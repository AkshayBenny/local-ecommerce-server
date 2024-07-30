package com.akshay.localecommerce.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.akshay.localecommerce.model.Cart;
import com.akshay.localecommerce.model.CartItem;
import com.akshay.localecommerce.model.Product;
import com.akshay.localecommerce.model.User;
import com.akshay.localecommerce.repository.CartItemRepository;
import com.akshay.localecommerce.repository.CartRepository;
import com.akshay.localecommerce.repository.ProductRepository;
import org.springframework.http.HttpStatus;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private CartItemRepository cartItemRepo;

    public ResponseEntity<Cart> getCartByUserId(Integer userId) {
        return new ResponseEntity<>(cartRepo.findByUserId(userId), HttpStatus.OK);
    }

    public ResponseEntity<String> addToUserCart(Integer productId, Integer quantity, User user) {
        try {
            Cart userCart = cartRepo.findByUserId(user.getId());
            if (userCart == null) {
                userCart = new Cart(user);
            }

            Optional<Product> productOptional = productRepo.findById(productId);
            if (productOptional.isPresent()) {
                Product product = productOptional.get();

                CartItem cartItem = userCart.getProducts().stream()
                        .filter(item -> item.getProduct().getId().equals(productId))
                        .findFirst()
                        .orElse(null);

                if (cartItem == null) {
                    cartItem = new CartItem();
                    cartItem.setProduct(product);
                    cartItem.setQuantity(quantity);
                    cartItem.setCart(userCart);
                    userCart.getProducts().add(cartItem);
                } else {
                    cartItem.setQuantity(cartItem.getQuantity() + quantity);
                }

                cartRepo.save(userCart);
                cartItemRepo.save(cartItem);

                return new ResponseEntity<>("Product added to cart successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Adding to cart went wrong!", HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<String> removeCartItemByProductId(Integer productId, Integer userId) {
        System.out.printf("userId: " + userId + "   productId: " + productId);
        try {
            Cart userCart = cartRepo.findByUserId(userId);
            CartItem cartItem = userCart.getProducts().stream()
                    .filter(item -> item.getProduct().getId().equals(productId))
                    .findFirst()
                    .orElse(null);

            if (cartItem != null) {
                userCart.getProducts().remove(cartItem);
                cartItemRepo.delete(cartItem);
                cartRepo.save(userCart);
                return new ResponseEntity<>("Product removed from cart successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Product not found in cart", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Removing from cart failed", HttpStatus.BAD_REQUEST);
        }
    }
}
