import { createAsyncThunk } from "@reduxjs/toolkit";
import admin from '../api/admin'

const { getAllUser, getUser, getAllStudents, getAllTeachers, createNewStudent, createNewTeacher, deleteUser,
} = admin

export const getAllUserThunk = createAsyncThunk(
    'student/getAllUser',
    async (data) => {
        const res = await getAllUser(data)
        return res
    }
)

export const getUserThunk = createAsyncThunk(
    'student/getUser',
    async (data) => {
        const res = await getUser(data)
        return res
    }
)

export const getAllStudentsThunk = createAsyncThunk(
    'student/getAllStudents',
    async (data) => {
        const res = await getAllStudents(data)
        return res
    }
)

export const getAllTeachersThunk = createAsyncThunk(
    'student/getAllTeachers',
    async (data) => {
        const res = await getAllTeachers(data)
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

export const deleteUserThunk = createAsyncThunk(
    'student/deleteUser',
    async (data) => {
        const res = await deleteUser(data)
        return res
    }
)