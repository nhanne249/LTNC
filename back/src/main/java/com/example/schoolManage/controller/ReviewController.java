package com.example.schoolManage.controller;

import com.example.schoolManage.model.review.Review;
import com.example.schoolManage.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final TeacherService teacherService;
    @GetMapping("/{teacher}")
    public ResponseEntity<Page<Review>> getAllReviews(@RequestParam int page, @PathVariable String teacher) {
        return new ResponseEntity<>(teacherService.getReviews(teacher, PageRequest.of(page-1, 10)), HttpStatus.OK);
    }
}
