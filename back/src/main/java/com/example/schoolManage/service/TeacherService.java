package com.example.schoolManage.service;

<<<<<<< HEAD
import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.user.Teacher;
import com.example.schoolManage.repository.ClassRepository;
import com.example.schoolManage.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicReference;
@Service
public class TeacherService {
    @Autowired UserRepository userRepository;
    @Autowired ClassService classService;
    @Autowired ClassRepository classRepository;
    public List<Classroom> getAllClasses(String teacherUsername){
        Teacher teacher = userRepository.findTeacherByUsername(teacherUsername).orElseThrow();
        if(teacher != null){
            return classRepository.findAllByTeacher(teacherUsername);
        }
        return null;
   }

    public Classroom getClass(String teacherUsername, String classId){
       Teacher teacher = userRepository.findTeacherByUsername(teacherUsername).orElseThrow();
       if (teacher != null){
           Classroom classroom = classRepository.findBySubject(classId).orElseThrow();
       }
        return null;
   }
   public Teacher searchTeacher(String username) {
       return userRepository.findTeacherByUsername(username).orElseThrow();
   }
   public Classroom addClass(String teacherUsername, Classroom newClass){
       Teacher teacher = userRepository.findTeacherByUsername(teacherUsername).orElseThrow();
       if (!classRepository.findById(newClass.getClassId()).isPresent()){

           Classroom class_result = new Classroom( newClass.getClassId(), newClass.getSubject(), newClass.getPlace(), newClass.getDay(), newClass.getTime(), newClass.getTeacher());
           classRepository.save(class_result);
           return class_result;
       }
       return null;
   }
   public Teacher getTeacherInfo(String teacherUsername){
       Teacher teacher = userRepository.findTeacherByUsername(teacherUsername).orElseThrow();
       if (teacher != null){
           return teacher;
       }
       return null;
   }
   public void updateTeacherInfo(String teacherUsername, String name, String email, String phoneNumber ){
       Teacher teacher = userRepository.findTeacherByUsername(teacherUsername).orElseThrow();
       if(teacher != null){
           teacher.setName(name);
           teacher.setEmail(email);
           teacher.setPhoneNumber(phoneNumber);
           userRepository.save(teacher);
       }

   }

=======

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.repository.ClassRepository;
import com.example.schoolManage.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {
    private final UserRepository userRepository;
    private final ClassRepository classRepository;

    public TeacherService(UserRepository userRepository, ClassRepository classRepository) {
        this.userRepository = userRepository;
        this.classRepository = classRepository;
    }
    public List<Classroom> getAllClasses(String username){
        return classRepository.findAllByTeacher(username);
    }
//    public Classroom getClass(String teacherUsername, String classId){
//        Teacher teacher = mongoTemplate.findOne(Query.query(Criteria.where("username").is(teacherUsername)), Teacher.class, "users");
//        AtomicReference<Classroom> cr = new AtomicReference<>();
//        teacher.getTeachingClasses().forEach(courseClass -> {
//            if(Objects.equals(courseClass.getClassId(), classId)){
//                cr.set(courseClass);
//            }
//        });
//        return cr.get();
//    }
//    public Teacher searchTeacher(String username) {
//        Query query = new Query(Criteria.where("username").is(username));
//        return mongoTemplate.findOne(query, Teacher.class, "users");
//    }
//    public Classroom addClass(String teacherUsername, String classId){
//        Teacher teacher = mongoTemplate.findOne(Query.query(Criteria.where("username").is(teacherUsername)), Teacher.class, "users");
//        Classroom classroom = mongoTemplate.findOne(Query.query(Criteria.where("classId").is(classId)), Classroom.class, "classes");
//        teacher.getTeachingClasses().add(classroom);
//        mongoTemplate.save(teacher);
//        return classroom;
//    }
//    public Teacher getTeacherInfo(String teacherUsername){
//        Teacher teacher = searchTeacher(teacherUsername);
//        if (teacher != null){
//            return teacher;
//        }
//        return null;
//    }
//    public void updateTeacherInfo(String teacherUsername, String name, String email, String phoneNumber ){
//        Teacher teacher = searchTeacher(teacherUsername);
//        if(teacher != null){
//            teacher.setName(name);
//            teacher.setEmail(email);
//            teacher.setPhoneNumber(phoneNumber);
//            mongoTemplate.save(teacher);
//        }
//
//    }
//    public List<Classroom> getAllClass(String teacherUsername){
//        Teacher teacher = searchTeacher(teacherUsername);
//        if(teacher != null){
//            return teacher.getTeachingClasses();
//        }
//        return null;
//    }
//    public Classroom getOneClass(String classId) {
//            for (Classroom classroom : classRepository.findAll()) {
//                if (classroom.getClassId().equals(classId)) {
//                    return classroom;
//                }
//            }
//            return null;
//    }
>>>>>>> eccaeaafb5cbaffcb512683dcaee0a65c77bc65a
}
