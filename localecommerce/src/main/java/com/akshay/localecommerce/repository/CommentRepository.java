package com.akshay.localecommerce.repository;

import java.util.List;
import com.akshay.localecommerce.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByProductId(Integer id);
}
