package com.akshay.localecommerce.controller;

import com.akshay.localecommerce.model.User;
import com.akshay.localecommerce.service.CommentService;
import com.akshay.localecommerce.service.UserManagementService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

/**
 * REST controller for handling comments under products
 */
@RestController
public class CommentController {
    @Autowired
    private CommentService commentService;

    @Autowired
    private UserManagementService userManagementService;

    /**
     * Get comments related to a product
     * 
     * @param pid Product id
     * @return List of comments if any or empty list
     */
    @GetMapping("public/comment/get-comment/{pid}")
    public ResponseEntity<?> getComments(@PathVariable Integer pid) {
        return commentService.getCommentsByProductId(pid);
    }

    /**
     * Posts a new comment under a product
     * @param requestBody An object containing comment to be added and the id of the product 
     * @return {@link ResponseEntity} message showing the result of this opetation
     */
    @PostMapping("adminuser/comment/add-comment")
    public ResponseEntity<?> addComment(@RequestBody Map<String, Object> requestBody) {
        String comment = (String) requestBody.get("comment");
        Integer pid = (Integer) requestBody.get("pid");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userManagementService.getUserByEmail(email);
        return commentService.addComment(pid, comment, user);
    }
}
