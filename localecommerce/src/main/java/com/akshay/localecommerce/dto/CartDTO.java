package com.akshay.localecommerce.dto;

import java.util.List;
import lombok.Data;

@Data
public class CartDTO {
    private Integer id;
    private List<CartItemDTO> products;

}
