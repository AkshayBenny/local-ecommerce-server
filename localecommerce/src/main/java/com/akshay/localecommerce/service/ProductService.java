package com.akshay.localecommerce.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.akshay.localecommerce.model.Product;
import com.akshay.localecommerce.repository.ProductRepository;

@Service
public class ProductService {
    @Autowired
    ProductRepository productDao;
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
                Product productWithImageUrl = new Product();
                 productWithImageUrl.setId(product.get().getId());
                productWithImageUrl.setName(product.get().getName());
                productWithImageUrl.setDescription(product.get().getDescription());
                productWithImageUrl.setPrice(product.get().getPrice());
                productWithImageUrl.setCategory(product.get().getCategory());
                productWithImageUrl.setImage(s3Service.getFileUrl(product.get().getId().toString()));
                return new ResponseEntity<>(productWithImageUrl, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<String> editProduct(
            Integer id, String name, String description, String price, String category, MultipartFile file) {
        try {
            Optional<Product> productOptional = productDao.findById(id);

            if (productOptional.isPresent()) {
                Product product = productOptional.get();

                if (name != null && !name.isEmpty()) {
                    product.setName(name);
                }
                if (description != null && !description.isEmpty()) {
                    product.setDescription(description);
                }
                if (price != null && !price.isEmpty()) {
                    try {
                        double priceDouble = Double.parseDouble(price);
                        product.setPrice(priceDouble);
                    } catch (Exception e) {
                        return new ResponseEntity<>("Invalid price format", HttpStatus.BAD_REQUEST);
                    }
                }
                if (category != null && !category.isEmpty()) {
                    product.setCategory(category);
                }
                if (file != null && !file.isEmpty()) {
                    // Delete the old file if it exists
                    String imageName = product.getId().toString();
                    try {
                        s3Service.deleteFileById(imageName);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    // Upload the new file
                    try {
                        s3Service.uploadFile(file, imageName);
                        product.setImage(imageName);
                    } catch (Exception e) {
                        return new ResponseEntity<>("Error uploading image to S3 bucket", HttpStatus.BAD_REQUEST);
                    }
                }

                productDao.save(product);
                return new ResponseEntity<>("Product updated", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Product update failed: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<String> deleteProductById(Integer id) {
        try {
            Optional<Product> product = productDao.findById(id);

            if (product.isPresent()) {
                productDao.deleteById(id);
                String imageName = product.get().getId().toString();
                try {
                    s3Service.deleteFileById(imageName);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                return new ResponseEntity<>("Product deleted successfully!", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Product not found!", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>("Error deleting product!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
