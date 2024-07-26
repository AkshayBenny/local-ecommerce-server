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

    public ResponseEntity<?> getAllOrdersByUserEmail(String email) {
        try {
            List<Order> userOrders = orderRepo.findByUserEmail(email);
            return new ResponseEntity<>(userOrders, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
    }

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

            return new ResponseEntity<>("Order created successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Order creation failed", HttpStatus.BAD_REQUEST);
        }
    }

}
