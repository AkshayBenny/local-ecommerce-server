package com.akshay.localecommerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.akshay.localecommerce.model.User;

public interface UserRepository extends JpaRepository<User, Integer>
{


    Optional<User> findByEmail(String email);


}
