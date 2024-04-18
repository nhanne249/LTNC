package com.example.schoolManage.controller;

import com.example.schoolManage.model.Notification;
import com.example.schoolManage.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationRepository notificationRepository;
    private static AtomicInteger counter = new AtomicInteger(0);
    @PostMapping
    public ResponseEntity<Notification> createNotification(@RequestBody Notification notification) {
        Notification newNotification = new Notification(counter.incrementAndGet(), notification.getTitle(), notification.getContent());
        return ResponseEntity.ok(notificationRepository.save(newNotification));
    }
    @GetMapping
    public ResponseEntity<Page<Notification>> getNotifications(@RequestParam int page) {
        List<Notification> ls = notificationRepository.findAll();
        Collections.reverse(ls);
        Page<Notification> pg =  new PageImpl<>(ls, PageRequest.of(page-1, 10) , ls.size());
        return ResponseEntity.ok(pg);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Notification> getNotification(@PathVariable long id) {
        return notificationRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<Notification> updateNotification(@PathVariable long id, @RequestBody Notification notification) {

        Optional<Notification> o = notificationRepository.findById(id);
        if(o.isEmpty()) {return ResponseEntity.notFound().build();}
        if(notification.getTitle()!= null)  o.get().setTitle(notification.getTitle());
        if(notification.getContent()!= null)  o.get().setContent(notification.getContent());
        return ResponseEntity.ok(notificationRepository.save(o.get()));
    }
    @DeleteMapping
    public ResponseEntity<String> deleteAllNotifications() {
        notificationRepository.deleteAll();
        return ResponseEntity.ok("all notifications deleted");
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNotification(@PathVariable long id) {
        notificationRepository.deleteById(id);
        return ResponseEntity.ok("notification deleted");
    }

}
