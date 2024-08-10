package com.akshay.localecommerce.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.akshay.localecommerce.model.Cart;
import com.akshay.localecommerce.model.CartItem;
import com.akshay.localecommerce.model.Order;
import com.akshay.localecommerce.model.OrderItem;
import com.akshay.localecommerce.model.User;
import com.akshay.localecommerce.repository.CartRepository;
import com.akshay.localecommerce.repository.OrderItemRepository;
import com.akshay.localecommerce.repository.OrderRepository;
import com.akshay.localecommerce.repository.UserRepository;

/**
 * Service to manage order placed by the users
 */
@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private OrderItemRepository orderItemRepo;

    /**
     * Fetches all the orders associated with a user
     * 
     * @param email Email address of the user
     * @return List of orders associated with the user or an empty list
     */
    public ResponseEntity<?> getAllOrdersByUserEmail(String email) {
        try {
            List<Order> userOrders = orderRepo.findByUserEmail(email);
            return new ResponseEntity<>(userOrders, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
    }

    /**
     * Fetches all the orders in the database
     * 
     * @return List of orders
     */
    public ResponseEntity<?> getAllOrders() {
        try {
            List<Order> orders = orderRepo.findAllByOrderByOrderDateDesc();
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("An error occurred while fetching orders", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get an order by its id
     * 
     * @param orderId Order id
     * @return {@link ResponseEntity} containing the order or {@code null}
     */
    public ResponseEntity<?> getOrderById(Integer orderId) {
        try {
            Optional<Order> orderOptional = orderRepo.findById(orderId);
            if (orderOptional.isPresent()) {
                return new ResponseEntity<>(orderOptional.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Order not found with id " + orderId, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
    }

    /**
     * Update the status of order. Can take values "PENDING", "SHIPPED" or
     * "DELIVERED"
     * 
     * @param orderId Order id
     * @param status  Status of the order
     * @return {@link ResponseEntity} message stating if the operation was
     *         successful or not
     */
    public ResponseEntity<?> updateOrderStatus(Integer orderId, String status) {
        try {
            Optional<Order> orderOptional = orderRepo.findById(orderId);
            if (!orderOptional.isPresent()) {
                return new ResponseEntity<>("Order not found", HttpStatus.NOT_FOUND);
            }
            Order order = orderOptional.get();
            order.setStatus(status);
            orderRepo.save(order);
            return new ResponseEntity<>("success", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);

    }

    /**
     * Creates a new order
     * 
     * @param email Email address of the user
     * @return {@link ResponseEntity} message stating if the operation was
     *         successful or not
     */
    public ResponseEntity<String> createOrder(String email) {
        try {
            Optional<User> userOptional = userRepo.findByEmail(email);
            if (!userOptional.isPresent()) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }

            User user = userOptional.get();
            Cart userCart = cartRepo.findByUserId(user.getId());
            if (userCart == null) {
                return new ResponseEntity<>("User cart not found", HttpStatus.NOT_FOUND);
            }

            List<CartItem> userCartItems = userCart.getProducts();
            if (userCartItems.isEmpty()) {
                return new ResponseEntity<>("Cart is empty", HttpStatus.BAD_REQUEST);
            }

            Double totalPrice = 0.0;
            LocalDateTime orderDate = LocalDateTime.now();
            List<OrderItem> orderItems = new ArrayList<>();

            Order newUserOrder = new Order();
            newUserOrder.setUser(user);
            newUserOrder.setOrderDate(orderDate);
            newUserOrder.setStatus("PENDING");

            for (CartItem cartItem : userCartItems) {
                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(newUserOrder);
                orderItem.setProduct(cartItem.getProduct());
                orderItem.setQuantity(cartItem.getQuantity());
                orderItem.setPrice(cartItem.getProduct().getPrice() * cartItem.getQuantity());

                orderItems.add(orderItem);

                totalPrice += orderItem.getPrice();
            }

            newUserOrder.setOrderItems(orderItems);
            newUserOrder.setTotalAmount(totalPrice);

            orderRepo.save(newUserOrder);
            orderItemRepo.saveAll(orderItems);

            userCart.getProducts().clear(); // Clear the cart after order is created
            cartRepo.save(userCart);

            return new ResponseEntity<>(newUserOrder.getId().toString(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Order creation failed", HttpStatus.BAD_REQUEST);
        }
    }

}
