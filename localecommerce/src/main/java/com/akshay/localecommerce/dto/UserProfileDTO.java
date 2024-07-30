package com.akshay.localecommerce.dto;

import com.akshay.localecommerce.model.Order;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserProfileDTO {
    private String email;
    private String name;
    private String city;
    private String street;
    private String buildingName;
    private String postcode;
    private String country;
    private List<Order> orders;

    public UserProfileDTO(String email, String name, String city, String street, String buildingName, String postcode,
            String country, List<Order> orders) {
        this.email = email;
        this.name = name;
        this.city = city;
        this.street = street;
        this.buildingName = buildingName;
        this.postcode = postcode;
        this.country = country;
        this.orders = orders;
    }
}
