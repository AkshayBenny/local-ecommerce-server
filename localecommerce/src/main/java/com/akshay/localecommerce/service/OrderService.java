package com.akshay.localecommerce.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.akshay.localecommerce.dto.OrderItemDTO;
import com.akshay.localecommerce.model.Cart;
import com.akshay.localecommerce.model.Order;
import com.akshay.localecommerce.model.OrderItem;
import com.akshay.localecommerce.model.Product;
import com.akshay.localecommerce.model.User;
import com.akshay.localecommerce.repository.CartRepository;
import com.akshay.localecommerce.repository.OrderItemRepository;
import com.akshay.localecommerce.repository.OrderRepository;
import com.akshay.localecommerce.repository.ProductRepository;
import com.akshay.localecommerce.repository.UserRepository;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private OrderItemRepository orderItemRepo;

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CartRepository cartRepo;

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
        // Optional<User> userOptional = userRepo.findByEmail(email);
        // if (!userOptional.isPresent()) {
        // return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        // }
        // User user = userOptional.get();

        // Cart userCart = cartRepo.findByUserId(user.getId());

        // if (userCart == null) {
        // return new ResponseEntity<>("user cart not found", HttpStatus.NOT_FOUND);
        // }

        // List<Product> userCartProducts = userCart.getProducts();

        // List<OrderItem> orderItems = new ArrayList<>();
        // double totalAmount = 0.0;

        // for (OrderItemDTO orderProduct : orderProducts) {
        // Integer productId = orderProduct.getProductId();
        // Optional<Product> productOptional = productRepo.findById(productId);
        // if (productOptional.isPresent()) {
        // Product product = productOptional.get();
        // Integer quantity = orderProduct.getQuantity();

        // OrderItem newOrderItem = new OrderItem();
        // newOrderItem.setProduct(product);
        // newOrderItem.setQuantity(quantity);
        // newOrderItem.setOrder(null); // Will set the order later

        // orderItems.add(newOrderItem);
        // totalAmount += product.getPrice() * quantity;
        // } else {
        // return new ResponseEntity<>("Product not found: " + productId,
        // HttpStatus.BAD_REQUEST);
        // }
        // }

        // try {
        // Order order = new Order();
        // order.setUser(user);
        // order.setOrderDate(LocalDateTime.now());
        // order.setStatus("PENDING");
        // order.setOrderItems(orderItems);
        // order.setTotalAmount(totalAmount);

        // orderRepo.save(order);

        // // Set the order reference in each order item and save them
        // for (OrderItem orderItem : orderItems) {
        // orderItem.setOrder(order);
        // orderItemRepo.save(orderItem);
        // }

        // return new ResponseEntity<>("Order created successfully", HttpStatus.OK);
        // } catch (Exception e) {
        // e.printStackTrace();
        // return new ResponseEntity<>("Error creating order",
        // HttpStatus.INTERNAL_SERVER_ERROR);
        // }
        return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
    }
}
