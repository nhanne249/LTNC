package com.example.schoolManage.utils;

import java.lang.reflect.Field;

public class Helper {
    public static void setIfNotNull(Object object, Object update) throws IllegalAccessException {
        Field[] updateFields = update.getClass().getDeclaredFields();
        Field[] objectFields = object.getClass().getDeclaredFields();
        for(Field updateField : updateFields) {
            updateField.setAccessible(true);
            for(Field objField : objectFields) {
                objField.setAccessible(true);
                if(updateField.getName().equals(objField.getName())) {
                    if(updateField.get(update) != null){
                        objField.set(object, updateField.get(update));
                    }
                }
            }
        }
    }
}
