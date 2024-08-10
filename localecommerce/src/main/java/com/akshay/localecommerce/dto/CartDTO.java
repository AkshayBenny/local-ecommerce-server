package com.akshay.localecommerce.dto;

import java.util.List;
import lombok.Data;

/**
 * DTO for a shopping cart
 */
@Data
public class CartDTO {
    private Integer id;
    private List<CartItemDTO> products;

}
