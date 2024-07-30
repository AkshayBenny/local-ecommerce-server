package com.akshay.localecommerce.service;

import com.akshay.localecommerce.model.Comment;
import com.akshay.localecommerce.model.Product;
import com.akshay.localecommerce.model.User;
import com.akshay.localecommerce.repository.CommentRepository;
import com.akshay.localecommerce.repository.ProductRepository;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepo;

    @Autowired
    private ProductRepository productRepo;

    public ResponseEntity<?> getCommentsByProductId(Integer productId) {
        try {
            return new ResponseEntity<>(commentRepo.findByProductId(productId), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<?> addComment(Integer productId, String comment, User user) {
        try {
            Optional<Product> productOptional = productRepo.findById(productId);
            if (!productOptional.isPresent()) {
                return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
            }

            Product product = productOptional.get();

            Comment newComment = new Comment(product, user, comment);
            commentRepo.save(newComment);

            return new ResponseEntity<>("success", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
    }
}
