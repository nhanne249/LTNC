//package com.example.schoolManage.service;
//
//import com.example.schoolManage.model.course.Classroom;
//import com.example.schoolManage.model.course.Course;
//import com.example.schoolManage.model.user.Teacher;
//import com.example.schoolManage.repository.ClassRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.mongodb.core.MongoTemplate;
//import org.springframework.data.mongodb.core.query.Criteria;
//import org.springframework.data.mongodb.core.query.Query;
//import org.springframework.stereotype.Service;
//import org.springframework.web.bind.annotation.PutMapping;
//
//import java.util.List;
//import java.util.Objects;
//import java.util.concurrent.atomic.AtomicReference;
//@Service
//public class TeacherService {
//    @Autowired
//    private MongoTemplate mongoTemplate;
//    @Autowired
//    public ClassRepository classRepository;
//    public List<Classroom> getAllClasses(String teacherUsername){
//        Teacher teacher = mongoTemplate.findOne(Query.query(Criteria.where("username").is(teacherUsername)), Teacher.class, "users");
//        return teacher.getTeachingClasses();
//    }
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
//}
