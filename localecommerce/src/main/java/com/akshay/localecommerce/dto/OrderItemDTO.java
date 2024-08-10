package com.akshay.localecommerce.dto;

import lombok.Data;

/**
 * DTO for an order item
 */
@Data
public class OrderItemDTO {
    private Integer productId;
    private Integer quantity;
}
