package com.akshay.localecommerce.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.akshay.localecommerce.dao.ProductDao;
import com.akshay.localecommerce.model.Product;

@Service
public class ProductService {
    @Autowired
    ProductDao productDao;


    
    public ResponseEntity<List<Product>> getAllProducts() {
        try {
            
            return new ResponseEntity<>(productDao.findAll(), HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
        }
        
        return new ResponseEntity(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<Product> getProductById(Integer id) {
        try {
            Optional<Product> product = productDao.findById(id);

            if (product.isPresent()){
                return new ResponseEntity<>(product.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
