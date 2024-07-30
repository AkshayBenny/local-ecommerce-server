package com.akshay.localecommerce.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;
import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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

    public Cart() {
        this.products = new ArrayList<>();
    }

    public Cart(User user) {
        this.user = user;
        this.products = new ArrayList<>();
    }
}
