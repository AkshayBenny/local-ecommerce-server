package com.akshay.localecommerce.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Collection;
import java.util.List;

/*
 * Represents a user 
 * Linked to cart, orders, comments
 * Integrates with spring security through implementng {@link UserDetails}
 */
@Entity
@Getter
@Setter
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String email;
    private String name;
    private String password;
    private String city;
    private String street;
    private String buildingName;
    private String postcode;
    private String country;
    private String role;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "user-cart")
    private Cart cart;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "user-order")
    private List<Order> orders;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "user-comment")
    private List<Comment> comments;

    /**
     * Returns the user's authorities based on their role.
     *
     * @return the authorities granted to the user.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role));
    }

    /**
     * Returns the user's password.
     *
     * @return the user's password.
     */
    @Override
    public String getPassword() {
        return password;
    }

    /**
     * Returns the user's name which is the email.
     *
     * @return the user's email.
     */
    @Override
    public String getUsername() {
        return email;
    }

    /**
     * Checks if the user's account is non-expired.
     *
     * @return true if the account is non-expired otherwise false.
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Checks if the user's account is non-locked.
     *
     * @return true if the account is non-locked othersiwe it returns false.
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Checks if the user's credentials are non-expired.
     *
     * @return true if the credentials are non-expired otherwise it returns false.
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Checks if the user is enabled.
     *
     * @return true if the user is enabled otherwise false.
     */
    @Override
    public boolean isEnabled() {
        return true;
    }

    /**
     * Return a string representation of the user entity
     * 
     * @return a string representation of the user entity
     */
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", city='" + city + '\'' +
                ", street='" + street + '\'' +
                ", buildingName='" + buildingName + '\'' +
                ", postcode='" + postcode + '\'' +
                ", country='" + country + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
