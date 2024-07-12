package com.akshay.localecommerce.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.akshay.localecommerce.dao.ProductDao;
import com.akshay.localecommerce.model.Product;

@Service
public class ProductService {
    @Autowired
    ProductDao productDao;
    @Autowired
    AmazonS3Service s3Service;

    public ResponseEntity<String> createProduct(
            String name, String desc, String price, String category, MultipartFile imageFile) {

        try {
            Product product = new Product();
            product.setName(name);
            product.setDescription(desc);
            product.setCategory(category);

            try {
                double priceDouble = Double.parseDouble(price);
                product.setPrice(priceDouble);
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>("Invalid price format", HttpStatus.BAD_REQUEST);
            }

            productDao.save(product);

            String imageName = product.getId().toString();
            try {
                s3Service.uploadFile(imageFile, imageName);
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>("Error uploading image to s3 bucket", HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Error creating a product", HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<List<Product>> getAllProducts() {
        try {
            List<Product> products = productDao.findAll().stream().map(product -> {
                Product productWithImageUrl = new Product();
                productWithImageUrl.setId(product.getId());
                productWithImageUrl.setName(product.getName());
                productWithImageUrl.setDescription(product.getDescription());
                productWithImageUrl.setPrice(product.getPrice());
                productWithImageUrl.setCategory(product.getCategory());
                productWithImageUrl.setImage(s3Service.getFileUrl(product.getId().toString()));
                return productWithImageUrl;
            }).collect(Collectors.toList());
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<Product> getProductById(Integer id) {
        try {
            Optional<Product> product = productDao.findById(id);

            if (product.isPresent()) {
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
