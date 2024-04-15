import { createAsyncThunk } from "@reduxjs/toolkit";
import admin from '../api/admin'

const { getAllUserByAdmin, getStudentById, createNewStudent, createNewTeacher, deleteUserById, createNewCourse, deleteCourse, createNewClass,
} = admin

export const getAllUserByAdminThunk = createAsyncThunk(
    'student/getAllUserByAdmin',
    async (data) => {
        const res = await getAllUserByAdmin(data)
        return res
    }
)

export const getStudentByIdThunk = createAsyncThunk(
    'student/getStudentById',
    async (data) => {
        const res = await getStudentById(data)
        return res
    }
)

export const createNewStudentThunk = createAsyncThunk(
    'student/createNewStudent',
    async (data) => {
        const res = await createNewStudent(data)
        return res
    }
)

export const createNewTeacherThunk = createAsyncThunk(
    'student/createNewTeacher',
    async (data) => {
        const res = await createNewTeacher(data)
        return res
    }
)

export const deleteUserByIdThunk = createAsyncThunk(
    'student/deleteUserById',
    async (data) => {
        const res = await deleteUserById(data)
        return res
    }
)

export const createNewCourseThunk = createAsyncThunk(
    'student/createNewCourse',
    async (data) => {
        const res = await createNewCourse(data)
        return res
    }
)

export const deleteCourseThunk = createAsyncThunk(
    'student/deleteCourse',
    async (data) => {
        const res = await deleteCourse(data)
        return res
    }
)

export const createNewClassThunk = createAsyncThunk(
    'student/createNewClass',
    async (data) => {
        const res = await createNewClass(data)
        return res
    }
)