package com.akshay.localecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.akshay.localecommerce.service.OrderService;
import com.akshay.localecommerce.service.ProductService;

/**
 * REST controller for handling admin operations
 */
@RestController
@RequestMapping("admin")
public class AdminController {
    @Autowired
    ProductService productService;

    @Autowired
    OrderService orderService;

    /**
     * Fetches all the orders
     * 
     * @return {@link ResponseEntity} which contains the list of all orders
     */
    @GetMapping("order/all")
    public ResponseEntity<?> getAllUsersOrders() {
        return orderService.getAllOrders();
    }

    /**
     * Updates the status of a particular order by id
     * 
     * @param orderId
     * @param status
     * @return {@link ResponseEntity} showing the result of this operation
     */
    @PostMapping("order/status/{orderId}/{status}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Integer orderId, @PathVariable String status) {
        return orderService.updateOrderStatus(orderId, status);
    }

    /**
     * Handles creation of a new product
     * 
     * @param name
     * @param desc
     * @param price
     * @param category
     * @param image
     * @return {@link ResponseEntity} showing the result of this operation
     */
    @PostMapping("product/new")
    public ResponseEntity<String> createProduct(
            @RequestParam("productName") String name,
            @RequestParam("productDescription") String desc,
            @RequestParam("productPrice") String price,
            @RequestParam("productCategory") String category,
            @RequestParam("productImage") MultipartFile image) {
        return productService.createProduct(name, desc, price, category, image);
    }

    /**
     * Edits a product by its id
     * 
     * @param id
     * @param name
     * @param desc
     * @param price
     * @param category
     * @param image
     * @return {@link ResponseEntity} showing the result of this opetation
     */
    @PutMapping("product/edit/{id}")
    public ResponseEntity<String> editProductById(
            @PathVariable Integer id,
            @RequestParam("productName") String name,
            @RequestParam("productDescription") String desc,
            @RequestParam("productPrice") String price,
            @RequestParam("productCategory") String category,
            @RequestParam("productImage") MultipartFile image) {
        return productService.editProduct(id, name, desc, price, category, image);
    }

    /**
     * Deletes a product by its id
     * 
     * @param id
     * @return {@link ResponseEntity} showing the result of this opetation
     */
    @DeleteMapping("product/delete/{id}")
    public ResponseEntity<String> deleteProductById(@PathVariable Integer id) {
        return productService.deleteProductById(id);
    }
}
