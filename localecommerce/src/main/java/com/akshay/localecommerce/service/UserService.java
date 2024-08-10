package com.akshay.localecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.akshay.localecommerce.repository.UserRepository;

/**
 * A service to manage details related to a user
 */
@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    /**
     * Fetches user data by their email
     * 
     * @param username Email address
     * @return {@link UserDetails} object or error is thrown
     */
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepo.findByEmail(username).orElseThrow();
    }

}
