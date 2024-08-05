package com.akshay.localecommerce.dto;

import com.akshay.localecommerce.model.Product;
import lombok.Data;

@Data
public class CartItemDTO {
    private Integer id;
    private Product product;
    private Integer quantity;

}