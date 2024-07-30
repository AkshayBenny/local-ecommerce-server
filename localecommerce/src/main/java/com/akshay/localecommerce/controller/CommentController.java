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

@RestController
public class CommentController {
    @Autowired
    private CommentService commentService;

    @Autowired
    private UserManagementService userManagementService;

    @GetMapping("public/comment/get-comment/{pid}")
    public ResponseEntity<?> getComments(@PathVariable Integer pid) {
        return commentService.getCommentsByProductId(pid);
    }

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
