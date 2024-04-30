package com.example.schoolManage.service;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.model.user.Student;
import com.example.schoolManage.repository.ClassRepository;
import com.example.schoolManage.repository.ScheduleRepository;
import com.example.schoolManage.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.*;

import static com.example.schoolManage.utils.Helper.setIfNotNull;

@Service
@RequiredArgsConstructor
public class ClassService {
    private final ClassRepository classRepository;
    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;

    public Page<Classroom> getAllClasses(int page) {
        return classRepository.findAll(PageRequest.of(page - 1, 10));
    }

    public Optional<Classroom> getClassByName(String name) {
        return classRepository.findByName(name);
    }

    public Classroom createClass(@NotNull Classroom classroom) {
        var check = classRepository.findByName(classroom.getName());
        if (check.isPresent()) {
            return null;
        }
        var wd = scheduleRepository.findByDay(classroom.getDay());
        if (wd.isEmpty()) {
            return null;
        }
        classroom.getTime().forEach(period -> wd.get().getTime().remove(period));
        Collections.sort(wd.get().getTime());
        scheduleRepository.save(wd.get());
        return classRepository.insert(new Classroom.Builder().name(classroom.getName())
                        .subject(classroom.getSubject())
                        .teacher(classroom.getTeacher())
                        .time(classroom.getTime())
                        .day(classroom.getDay())
                        .build());
    }
    public void updateClass(String name, Classroom update) throws IllegalAccessException {
        var classroom = classRepository.findByName(name);
        if(classroom.isPresent()){
            setIfNotNull(classroom.get(), update);
            classRepository.save(classroom.get());
        }
    }
    public void deleteClass(String name) {
        var cl = classRepository.findByName(name);
        if (cl.isEmpty())
            return;
        Classroom classroom = cl.get();
        var wd = scheduleRepository.findByDay(classroom.getDay());
        classroom.getTime().forEach(period -> wd.get().getTime().add(period));
        Collections.sort(wd.get().getTime());
        scheduleRepository.save(wd.get());
        classRepository.deleteByName(name);
    }

    public void deleteAllClasses() {
        List<Integer> ls = new ArrayList<>(10);
        for (int i = 1; i <= 10; i++) {
            ls.add(i);
        }
        var wd = scheduleRepository.findAll();
        wd.forEach(weekday -> {
            weekday.setTime(ls);
            scheduleRepository.save(weekday);
        });
        classRepository.deleteAll();
    }

    public Page<Student> getAllStudent(String classname, Pageable pageable) {
        List<Student> ls = new ArrayList<>();
        var classroom = classRepository.findByName(classname);
        classroom.ifPresent(value -> value.getStudents().forEach(student -> ls.add(userRepository.findStudentByUsername(student).get())));
        return new PageImpl<>(ls, pageable, ls.size());
    }
}
