package com.akshay.localecommerce.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

/**
 * Represents a comment under a product by a user
 * Linked to user and product
 */
@Data
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    @JsonBackReference(value = "product-comment")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference(value = "user-comment")
    private User user;

    private String content;
    private LocalDateTime createdAt;

    /**
     * Default constructor that initialises with the current timestamp
     */
    public Comment() {
        this.createdAt = LocalDateTime.now();
    }

    /**
     * Initialises a new comment with a product, user and content (the comment
     * message)
     * 
     * @param product
     * @param user
     * @param content
     */
    public Comment(Product product, User user, String content) {
        this.product = product;
        this.user = user;
        this.content = content;
        this.createdAt = LocalDateTime.now();
    }
}
