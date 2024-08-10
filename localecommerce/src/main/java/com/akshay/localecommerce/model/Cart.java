package com.akshay.localecommerce.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;
import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

/**
 * This Cart entity represents a user's shopping cart.
 * This entity is linked to a specific user and contains a list of products
 * called cart items that the user added to the cart.
 */
@Data
@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference(value = "user-cart")
    private User user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "cart-cartItem")
    private List<CartItem> products = new ArrayList<>();

    /**
     * Constructor for creating an empty cart
     * Used for when creating a new cart without a user
     */
    public Cart() {
        this.products = new ArrayList<>();
    }

    /**
     * Constructor for creating a cart for a specific user
     * This initializes the cart with no items but links it with the provided user
     * 
     * @param user
     */
    public Cart(User user) {
        this.user = user;
        this.products = new ArrayList<>();
    }
}
