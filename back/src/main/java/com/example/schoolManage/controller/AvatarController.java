package com.example.schoolManage.controller;

import com.example.schoolManage.model.Avatar;
import com.example.schoolManage.repository.AvatarRepository;
import com.example.schoolManage.utils.FileUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/avatar")
@RequiredArgsConstructor
public class AvatarController {
    private final AvatarRepository avatarRepository;
    @PostMapping
    public ResponseEntity<String> uploadAvatar(@RequestParam("file") MultipartFile file) throws IOException {
        avatarRepository.save(new Avatar(getLoggedInUserDetails().getUsername(), FileUtils.compress(file.getBytes())));
        return ResponseEntity.ok().body("Avatar uploaded");
    }
    @GetMapping
    public ResponseEntity<byte[]> getAvatar() {
        var ava = avatarRepository.findByUsername(getLoggedInUserDetails().getUsername());
        return ava.map(avatar -> ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(FileUtils.decompress(ava.get().getImage())))
                .orElseGet(()-> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
    public UserDetails getLoggedInUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            return (UserDetails) authentication.getPrincipal();
        }
        return null;
    }
}
