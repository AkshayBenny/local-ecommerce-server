package com.akshay.localecommerce.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

/*
 * Represents the order placed by the user
 * Linked to a user and can contain multiple order items
 */
@Data
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference(value = "user-order")
    private User user;

    private LocalDateTime orderDate;
    private String status; // e.g., PENDING, SHIPPED, DELIVERED
    private String paymentIntentId;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "order-orderItem")
    private List<OrderItem> orderItems;

    private Double totalAmount;
    private Boolean isPaid = false;
}
