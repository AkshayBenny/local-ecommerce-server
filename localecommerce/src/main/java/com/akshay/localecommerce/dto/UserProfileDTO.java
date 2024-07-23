package com.akshay.localecommerce.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

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

    public UserProfileDTO(String email, String name, String city, String street, String buldingName, String postcode,
            String country) {
        this.email = email;
        this.name = name;
        this.city = city;
        this.street = street;
        this.buildingName = buldingName;
        this.postcode = postcode;
        this.country = country;
    }
}
