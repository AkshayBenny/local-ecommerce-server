package com.akshay.localecommerce.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonBackReference;

/*Represents an item inside an order
 * Linked to a product and order
 */
@Data
@Entity
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    @JsonBackReference(value = "order-orderItem")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    @JsonBackReference(value = "product-orderItem")
    private Product product;

    private Integer quantity;
    private Double price;
}
