package com.akshay.localecommerce.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonBackReference;

/**
 * This CartItem represents an item in a cart
 * Linked to either a cart or an order
 */
@Data
@Entity
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = true)
    @JsonBackReference(value = "cart-cartItem")
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = true)
    @JsonBackReference(value = "order-orderItem")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    @JsonBackReference(value = "product-cartItem")
    private Product product;

    private Integer quantity = 1;
}
