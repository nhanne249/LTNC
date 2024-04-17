package com.example.schoolManage.service;

import com.example.schoolManage.model.course.Classroom;
import com.example.schoolManage.repository.ClassRepository;
import com.example.schoolManage.repository.WeekdayRepository;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClassService {
    private final ClassRepository classRepository;
    private final WeekdayRepository weekdayRepository;

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
    public void deleteAllClasses(){
        List<Integer> ls = new ArrayList<>(10);
        for(int i=1; i<=10; i++){
            ls.add(i);
        }
        var wd = weekdayRepository.findAll();
        wd.forEach(weekday -> {
            weekday.setTime(ls);
            weekdayRepository.save(weekday);
        });
        classRepository.deleteAll();
    }
}
