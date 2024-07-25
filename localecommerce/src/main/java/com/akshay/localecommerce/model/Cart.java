package com.akshay.localecommerce.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.ArrayList;

@Data
@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<CartItem> products = new ArrayList<>();

    public Cart() {
        this.products = new ArrayList<>();
    }

    public Cart(User user) {
        this.user = user;
        this.products = new ArrayList<>();
    }

    @Override
    public String toString() {
        return "Cart => " +
                "id=" + id +
                ", user='" + user + '\'' +
                ", products='" + products + '\'';
    }
}
