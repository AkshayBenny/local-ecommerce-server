package com.akshay.localecommerce.service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.akshay.localecommerce.dto.ReqRes;
import com.akshay.localecommerce.dto.UserProfileDTO;

import com.akshay.localecommerce.model.User;
import com.akshay.localecommerce.repository.OrderRepository;
import com.akshay.localecommerce.repository.UserRepository;
import com.akshay.localecommerce.security.JWTUtils;

/**
 * Service to manage users in the database
 */
@Service
public class UserManagementService {
    @Autowired
    public UserRepository userRepo;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Registers a new user
     * 
     * @param registrationRequest Contains registration values such as email, name,
     *                            password, role etc..
     * @return {@link ResponseEntity} stating if the operation was successful or not
     */
    public ReqRes register(ReqRes registrationRequest) {
        ReqRes resp = new ReqRes();

        try {
            User user = new User();
            user.setEmail(registrationRequest.getEmail());
            user.setRole(registrationRequest.getRole());
            user.setName(registrationRequest.getName());
            user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            User userResult = userRepo.save(user);
            if (userResult.getId() > 0) {
                resp.setUsers((userResult));
                resp.setMessage("User Saved Successfully");
                resp.setStatusCode(200);
            }

        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }

        return resp;
    }

    /**
     * Logs an existing user into the application
     * 
     * @param loginRequest Login details such as email and password
     * @return {@link ResponseEntity} message stating if the operation was
     *         successful or not
     */
    public ReqRes login(ReqRes loginRequest) {
        ReqRes response = new ReqRes();
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                            loginRequest.getPassword()));
            var user = userRepo.findByEmail(loginRequest.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hrs");
            response.setMessage("Successfully Logges In");

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }

    /**
     * Generates a refresh token
     * 
     * @param refreshTokenReqiest Details required to generate a new refresh token
     * @return A refresh token
     */
    public ReqRes refreshToken(ReqRes refreshTokenReqiest) {
        ReqRes response = new ReqRes();
        try {
            String ourEmail = jwtUtils.extractionUsername(refreshTokenReqiest.getToken());
            User users = userRepo.findByEmail(ourEmail).orElseThrow();
            if (jwtUtils.isTokenValid(refreshTokenReqiest.getToken(), users)) {
                var jwt = jwtUtils.generateToken(users);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenReqiest.getToken());
                response.setExpirationTime("24Hr");
                response.setMessage("Successfully Refreshed Token");
            }
            response.setStatusCode(200);
            return response;

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            return response;
        }
    }

    /**
     * Fetch all users in the database
     * 
     * @return List of all {@link User} objects
     */
    public ReqRes getAllUsers() {
        ReqRes reqRes = new ReqRes();

        try {
            List<User> result = userRepo.findAll();
            if (!result.isEmpty()) {
                reqRes.setUsersList(result);
                reqRes.setStatusCode(200);
                reqRes.setMessage("Successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("No users found");
            }
            return reqRes;
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + e.getMessage());
            return reqRes;
        }
    }

    /**
     * Get a user by their id
     * 
     * @param id User id
     * @return A {@link User} object or {@code null} if not found
     */
    public ReqRes getUsersById(Integer id) {
        ReqRes reqRes = new ReqRes();
        try {
            User usersById = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User Not found"));
            reqRes.setUsers(usersById);
            reqRes.setStatusCode(200);
            reqRes.setMessage("Users with id '" + id + "' found successfully");
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + e.getMessage());
        }
        return reqRes;
    }

    /**
     * Fetch a user by their email address
     * 
     * @param email Email address of the user
     * @return A {@link User} object or {@code null} if not found
     */
    public User getUserByEmail(String email) {
        Optional<User> user = userRepo.findByEmail(email);
        return user.get();
    }

    /**
     * Deletes a user by their id
     * 
     * @param userId User id
     * @return Returns a message stating if the operation was successful or not
     */
    public ReqRes deleteUser(Integer userId) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<User> userOptional = userRepo.findById(userId);
            if (userOptional.isPresent()) {
                userRepo.deleteById(userId);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User deleted successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for deletion");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while deleting user: " + e.getMessage());
        }
        return reqRes;
    }

    /**
     * Update the data related to a user profile
     * 
     * @param userId      User id
     * @param updatedUser The new data to replace existing data related a user
     *                    entity
     * @return Message stating if the operation was successful or not
     */
    public ReqRes updateUser(Integer userId, User updatedUser) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<User> userOptional = userRepo.findById(userId);
            if (userOptional.isPresent()) {
                User existingUser = userOptional.get();
                existingUser.setEmail(updatedUser.getEmail());
                existingUser.setName(updatedUser.getName());
                existingUser.setRole(updatedUser.getRole());

                // Check if password is present in the request
                if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                    // Encode the password and update it
                    existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                }

                User savedUser = userRepo.save(existingUser);
                reqRes.setUsers(savedUser);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User updated successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for update");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while updating user: " + e.getMessage());
        }
        return reqRes;
    }

    /**
     * Gets user information
     * 
     * @param email Email address
     * @return {@link ReqRes} object containing the user information
     */
    public ReqRes getMyInfo(String email) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<User> userOptional = userRepo.findByEmail(email);
            if (userOptional.isPresent()) {
                reqRes.setUsers(userOptional.get());
                reqRes.setStatusCode(200);
                reqRes.setMessage("successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for update");
            }

        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while getting user info: " + e.getMessage());
        }
        return reqRes;

    }

    /**
     * Sets the address of the user for their profile
     * 
     * @param userEmail    Email address of the user
     * @param city         City of the user
     * @param street       Street of the user
     * @param buildingName Building name of the user
     * @param postcode     Postcode of the user
     * @param country      Country of residence of the user
     * @return {@link ResponseEntity} message stating if the operation was
     *         successful or not
     */
    public ResponseEntity<String> setUserAddress(String userEmail, String city, String street, String buildingName,
            String postcode, String country) {
        try {
            Optional<User> userOptional = userRepo.findByEmail(userEmail);

            if (!userOptional.isPresent()) {
                return new ResponseEntity<>("user not found", HttpStatus.BAD_REQUEST);
            }

            User user = userOptional.get();
            user.setCity(city);
            user.setStreet(street);
            user.setBuildingName(buildingName);
            user.setPostcode(postcode);
            user.setCountry(country);

            userRepo.save(user);

            return new ResponseEntity<>("success", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>("failure", HttpStatus.BAD_REQUEST);
    }

    /**
     * Fetches the profile information related to a user
     * 
     * @param email Email address
     * @return {@link ResponseEntity} containing the profile information if found or
     *         {@code null}
     */
    public ResponseEntity<?> getUserProfile(String email) {
        try {
            Optional<User> userOptional = userRepo.findByEmail(email);

            if (!userOptional.isPresent()) {
                return new ResponseEntity<>("user not found", HttpStatus.NOT_FOUND);
            }

            User user = userOptional.get();

            UserProfileDTO userProfile = new UserProfileDTO(
                    user.getEmail(),
                    user.getName(),
                    user.getCity(),
                    user.getStreet(),
                    user.getBuildingName(),
                    user.getPostcode(),
                    user.getCountry(),
                    user.getOrders());

            return new ResponseEntity<>(userProfile, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("failure", HttpStatus.BAD_REQUEST);
    }
}