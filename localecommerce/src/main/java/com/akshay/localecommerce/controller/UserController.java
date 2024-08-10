package com.akshay.localecommerce.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.akshay.localecommerce.dto.ReqRes;
import com.akshay.localecommerce.model.User;
import com.akshay.localecommerce.service.UserManagementService;

/**
 * REST controller to manage user operations
 */
@RestController
public class UserController {
    @Autowired
    private UserManagementService userManagementService;

    /**
     * Registers a new user
     * 
     * @param req {@link ReqRes} object containing the registration details
     * @return {@link ReqRes} object containing the registration result
     */
    @PostMapping("/auth/register")
    public ResponseEntity<ReqRes> register(@RequestBody ReqRes req) {
        return ResponseEntity.ok(userManagementService.register(req));
    }

    /**
     * Logs a user in
     * 
     * @param req {@link ReqRes} object containing the authentication details
     * @return {@link ReqRes} object containing the authentication result
     */
    @PostMapping("/auth/login")
    public ResponseEntity<ReqRes> login(@RequestBody ReqRes req) {
        return ResponseEntity.ok(userManagementService.login(req));
    }

    /**
     * Grants a refresh token
     * 
     * @param req {@link ReqRes} object containing the refresh token details
     * @return {@link ReqRes} object containing the refresh token result
     */
    @GetMapping("/admin/refresh")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes req) {
        return ResponseEntity.ok(userManagementService.refreshToken(req));
    }

    /**
     * Admin route to get all users
     * 
     * @return {@link ResponseEntity} list of all users
     */
    @GetMapping("/admin/get-all-users")
    public ResponseEntity<ReqRes> getAllUsers() {
        return ResponseEntity.ok(userManagementService.getAllUsers());
    }

    /**
     * Get a user by their id
     * 
     * @param userId User id
     * @return {@link ResponseEntity} containing a user object if found
     */
    @GetMapping("/admin/get-users/{userId}")
    public ResponseEntity<ReqRes> getUserById(@PathVariable Integer userId) {
        return ResponseEntity.ok(userManagementService.getUsersById(userId));
    }

    /**
     * Update a user by their id
     * 
     * @param userId User id
     * @param reqres {@link User} object containing the details to update
     * @return {@link ResponseEntity} containing the updated user object
     */
    @PutMapping("/admin/update/{userId}")
    public ResponseEntity<ReqRes> updateUser(@PathVariable Integer userId, @RequestBody User reqres) {
        return ResponseEntity.ok(userManagementService.updateUser(userId, reqres));
    }

    /**
     * Gets a user's profile info
     * 
     * @return {@link ResponseEntity} containing the profile information of the user
     */
    @GetMapping("/adminuser/get-user-profile")
    public ResponseEntity<?> getUserProfileByEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        return userManagementService.getUserProfile(email);
    }

    /**
     * Set the profile details of the user
     * 
     * @param profileData The data to be updated
     * @return {@link ResponseEntity} message containing the result of the operation
     */
    @PostMapping("/adminuser/set-profile")
    public ResponseEntity<String> setProfile(@RequestBody Map<String, String> profileData) {
        String city = profileData.get("city");
        String street = profileData.get("street");
        String buildingName = profileData.get("buildingName");
        String postcode = profileData.get("postcode");
        String country = profileData.get("country");

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userManagementService.setUserAddress(email, city, street, buildingName, postcode, country);
    }

    /**
     * Delete a user by their id
     * 
     * @param userId User id
     * @return {@link ReqRes} an object containing the result of the opetation
     */
    @DeleteMapping("/admin/delete/{userId}")
    public ResponseEntity<ReqRes> deleteUser(@PathVariable Integer userId) {
        return ResponseEntity.ok(userManagementService.deleteUser(userId));
    }
}
