package com.akshay.localecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.akshay.localecommerce.service.ProductService;

@RestController
@RequestMapping("admin")
public class AdminController {
    @Autowired
    ProductService productService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("order/all")
    public ResponseEntity<String> getAllUsersOrders() {
        return new ResponseEntity<>("All users orders", HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("product/new")
    public ResponseEntity<String> createProduct(
            @RequestParam("productName") String name,
            @RequestParam("productDescription") String desc,
            @RequestParam("productPrice") String price,
            @RequestParam("productCategory") String category,
            @RequestParam("productImage") MultipartFile image) {
        return productService.createProduct(name, desc, price, category, image);
    }

    @CrossOrigin(origins = "http://localhost:3000")
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

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("product/delete/{id}")
    public ResponseEntity<String> deleteProductById(@PathVariable Integer id) {
        return productService.deleteProductById(id);
    }
}
