package com.example.schoolManage.service;

import com.example.schoolManage.model.course.Course;
import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.model.user.Teacher;
import com.example.schoolManage.model.user.User;
import com.example.schoolManage.repository.ClassRepository;
import com.example.schoolManage.repository.CourseRepository;
import com.example.schoolManage.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.example.schoolManage.SchoolManageApplication.currentUsers;

@Service
public class AdminService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final ClassRepository classRepository;

    public AdminService(PasswordEncoder passwordEncoder, UserRepository userRepository, CourseRepository courseRepository, ClassRepository classRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.classRepository = classRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public Page<User> getUsersPage(int page){
        final int PAGE_SIZE = 10;
        return userRepository.findAll(PageRequest.of(page - 1, PAGE_SIZE)); //danh so bat dau tu 0
    }
    public Student createStudent(Student student) {

        if (userRepository.findByUsername(student.getUsername()).isPresent()) {
            return null;
        }
        currentUsers += 1;
        return userRepository.save(new Student(student.getUsername(), passwordEncoder.encode(student.getPassword()),
                student.getName(), student.getStudentId(), student.getEmail(), student.getPhoneNumber()));
    }

    public Teacher createTeacher(Teacher teacher) {
        if (userRepository.findByUsername(teacher.getUsername()).isPresent()) {
            return null;
        }
        currentUsers +=1;
        return userRepository.save(new Teacher(teacher.getUsername(),
                passwordEncoder.encode(teacher.getPassword()),
                teacher.getName(),
                teacher.getEmail(),
                teacher.getPhoneNumber()));
    }

    public Optional<User> getUser(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> deleteUser(String username) {
        currentUsers -=1;
        var usr = userRepository.findByUsername(username);
        if(usr.isPresent()){
            long id = usr.get().getId();
            userRepository.deleteById(id);
        }
        return usr;
    }

    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourse(String courseId) {
        return courseRepository.findById(courseId);
    }
    public void deleteCourse(String courseId) {
        courseRepository.deleteById(courseId);
    }

    public Classroom addClass(Classroom classroom) {
        return classRepository.save(classroom);
    }
    public void deleteClass(String classId){
        classRepository.deleteById(classId);
    }
}
