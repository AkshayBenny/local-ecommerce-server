package com.akshay.localecommerce.repository;

import java.util.List;
import com.akshay.localecommerce.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for accessing the {@link Comment} entity
 * 
 */
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    /**
     * Finds a list of {@link Comment} by {@link Product} id
     * 
     * @param id Product id
     * @return List of {@link Comment}
     */
    List<Comment> findByProductId(Integer id);
}
