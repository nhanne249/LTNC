package com.example.schoolManage.service;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.repository.ClassRepository;
import com.example.schoolManage.repository.WeekdayRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ClassService {
    private final ClassRepository classRepository;
    private final WeekdayRepository weekdayRepository;
    public ClassService(ClassRepository classRepository, WeekdayRepository weekdayRepository) {
        this.classRepository = classRepository;
        this.weekdayRepository = weekdayRepository;
    }
    public Page<Classroom> getAllClasses(int page){
        return classRepository.findAll(PageRequest.of(page-1, 10));
    }
    public Optional<Classroom> getClassByName(String name){
        return classRepository.findByName(name);
    }
    public Classroom createClass(@NotNull Classroom classroom){
        var wd = weekdayRepository.findByDay(classroom.getDay());
        if(wd.isEmpty()){return null;}
        classroom.getTime().forEach(period ->{
            wd.get().getTime().remove(period);
        });
        Collections.sort(wd.get().getTime());
        weekdayRepository.save(wd.get());
        return classRepository.insert(new Classroom(classroom.getName(),
                classroom.getSubject(),
                classroom.getPlace(),
                classroom.getDay(),
                classroom.getTime(),
                classroom.getTeacher()));
    }
    public void deleteClass(String name){
        var cl = classRepository.findByName(name);
        if(cl.isEmpty()) return;
        Classroom classroom = cl.get();
        var wd = weekdayRepository.findByDay(classroom.getDay());
        classroom.getTime().forEach(period ->{
            wd.get().getTime().add(period);
        });
        Collections.sort(wd.get().getTime());
        weekdayRepository.save(wd.get());
        classRepository.deleteByName(name);
    }
}
