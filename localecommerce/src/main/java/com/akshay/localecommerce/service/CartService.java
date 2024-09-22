package com.akshay.localecommerce.service;

import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.akshay.localecommerce.dto.CartDTO;
import com.akshay.localecommerce.dto.CartItemDTO;
import com.akshay.localecommerce.model.Cart;
import com.akshay.localecommerce.model.CartItem;
import com.akshay.localecommerce.model.Product;
import com.akshay.localecommerce.model.User;
import com.akshay.localecommerce.repository.CartItemRepository;
import com.akshay.localecommerce.repository.CartRepository;
import com.akshay.localecommerce.repository.ProductRepository;
import org.springframework.http.HttpStatus;

/**
 * Service to manage cart operations
 */
@Service
public class CartService {
    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private CartItemRepository cartItemRepo;

    @Autowired
    private AmazonS3Service s3Service;

    /**
     * Gets the cart by user id
     * 
     * @param userId User id
     * @return {@link ResponseEntity} consisting of the {@link CartDTO} or http
     *         status of NOT_FOUND
     */
    public ResponseEntity<CartDTO> getCartByUserId(Integer userId) {
        Cart cart = cartRepo.findByUserId(userId);
        if (cart != null) {
            CartDTO cartDTO = new CartDTO();
            cartDTO.setId(cart.getId());
            cartDTO.setProducts(cart.getProducts().stream().map(cartItem -> {
                CartItemDTO cartItemDTO = new CartItemDTO();
                cartItemDTO.setId(cartItem.getId());
                cartItemDTO.setQuantity(cartItem.getQuantity());

                Optional<Product> productOptional = productRepo.findById(cartItem.getProduct().getId());
                if (productOptional.isPresent()) {
                    Product product = productOptional.get();
                    product.setImage(s3Service.getFileUrl(product.getId().toString()));
                    cartItemDTO.setProduct(product);
                }

                return cartItemDTO;
            }).collect(Collectors.toList()));

            return new ResponseEntity<>(cartDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Adds a product to the cart associated with the {@link User}
     * 
     * @param productId Product id
     * @param quantity  Quantity of the product
     * @param user      User entity
     * @return {@link ResponseEntity} message indicating success or failure
     */
    public ResponseEntity<String> addToUserCart(Integer productId, Integer quantity, User user) {
        try {
            synchronized (this) {
                Cart userCart = cartRepo.findByUserId(user.getId());
                if (userCart == null) {
                    userCart = new Cart(user);
                    cartRepo.save(userCart);
                }

                Optional<Product> productOptional = productRepo.findById(productId);
                if (productOptional.isPresent()) {
                    Product product = productOptional.get();

                    boolean productExistsInCart = false;

                    for (CartItem item : userCart.getProducts()) {
                        if (item.getProduct().getId().equals(productId)) {
                            item.setQuantity(item.getQuantity() + quantity);
                            productExistsInCart = true;
                            cartItemRepo.save(item);
                            break;
                        }
                    }

                    if (!productExistsInCart) {
                        CartItem cartItem = new CartItem();
                        cartItem.setProduct(product);
                        cartItem.setQuantity(quantity);
                        cartItem.setCart(userCart);
                        userCart.getProducts().add(cartItem);
                        cartItemRepo.save(cartItem);
                    }

                    cartRepo.save(userCart);

                    return new ResponseEntity<>("Product added to cart successfully", HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Adding to cart went wrong!", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Removes a {@link CartItem} from the cart
     * 
     * @param productId Product id
     * @param userId    User id
     * @return {@link ResponseEntity} message stating if the operation was
     *         successful or not
     */
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
