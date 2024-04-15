//package com.example.schoolManage.controller;
//
//import com.example.schoolManage.model.course.Classroom;
//import com.example.schoolManage.model.course.Course;
//import com.example.schoolManage.model.user.Teacher;
//import com.example.schoolManage.service.TeacherService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/teacher")
//public class TeacherController {
//    @Autowired
//    TeacherService teacherService;
//// GET info : /teacher/info
//// PUT info : /teacher/info {Name, Email, phoneNumber}
//// GET classes : /teacher/classes
//    // @GetMapping("/classes")
//    // public ResponseEntity<List<Classroom>> allClasses() {
//    // return new
//    // ResponseEntity<List<Classroom>>(teacherService.getAllClasses(getLoggedInUserDetails().getUsername()),
//    // HttpStatus.OK);
//    // }
//
//    @GetMapping("/info")
//    public ResponseEntity<Teacher> getTeacherInfo() {
//        Teacher teacher = teacherService.getTeacherInfo(getLoggedInUserDetails().getUsername());
//        if (teacher != null) {
//            return ResponseEntity.ok(teacher);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    @PutMapping("/info")
//    public ResponseEntity<Void> updateInfo(@RequestBody Teacher teacher) {
//        teacherService.updateTeacherInfo(getLoggedInUserDetails().getUsername(), teacher.getName(), teacher.getEmail(), teacher.getPhoneNumber());
//        return ResponseEntity.ok().build();
//    }
//
//    @GetMapping("/classes")
//    public ResponseEntity<List<Classroom>> getAllClasses() {
//        List<Classroom> teachingClass = teacherService.getAllClasses(getLoggedInUserDetails().getUsername());
//        if (teachingClass != null) {
//            return ResponseEntity.ok(teachingClass);
//        }
//        return ResponseEntity.notFound().build();
//    }
//
//    @GetMapping("/class/{classId}")
//    public ResponseEntity<Classroom> getOneClass(@PathVariable String classId) {
//        Classroom classroom = teacherService.getOneClass(classId);
//        if (classroom != null) {
//            return ResponseEntity.ok(classroom);
//        }
//        return ResponseEntity.notFound().build();
//    }
//
////    @PutMapping("/change-class")
////    public ResponseEntity<Void> changeClass(@RequestBody Classroom newClass) {
////        teacherService.changeClass(newClass);
////        return ResponseEntity.ok().build();
////    }
//
////    @PostMapping("/scores")
////    public ResponseEntity<Void> giveScore(@PathVariable String username, @RequestParam Course course,
////            @RequestParam String classId, @RequestParam String studentId, @RequestParam double score) {
////        teacherService.giveScore(username, course, classId, studentId, score);
////        return ResponseEntity.ok().build();
////    }
//
//    public UserDetails getLoggedInUserDetails() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
//            return (UserDetails) authentication.getPrincipal();
//        }
//        return null;
//    }
//}
