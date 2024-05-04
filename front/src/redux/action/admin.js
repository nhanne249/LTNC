import { createAsyncThunk } from "@reduxjs/toolkit";
import admin from '../api/admin'

const { getAllUser, getUser, getAllStudents, getAllTeachers, createNewStudent, createNewTeacher, deleteUser,createNewClass,getAllClass,getClass, deleteClass,getTeacherList
} = admin

export const getAllUserThunk = createAsyncThunk(
    'admin/getAllUser',
    async (data) => {
        const res = await getAllUser(data)
        return res
    }
)

export const getUserThunk = createAsyncThunk(
    'admin/getUser',
    async (data) => {
        const res = await getUser(data)
        return res
    }
)

export const getAllStudentsThunk = createAsyncThunk(
    'admin/getAllStudents',
    async (data) => {
        const res = await getAllStudents(data)
        return res
    }
)

export const getAllTeachersThunk = createAsyncThunk(
    'admin/getAllTeachers',
    async (data) => {
        const res = await getAllTeachers(data)
        return res
    }
)

export const createNewStudentThunk = createAsyncThunk(
    'admin/createNewStudent',
    async (data) => {
        const res = await createNewStudent(data)
        return res
    }
)

export const createNewTeacherThunk = createAsyncThunk(
    'admin/createNewTeacher',
    async (data) => {
        const res = await createNewTeacher(data)
        return res
    }
)

export const deleteUserThunk = createAsyncThunk(
    'admin/deleteUser',
    async (data) => {
        const res = await deleteUser(data)
        return res
    }
)

export const createNewClassThunk = createAsyncThunk(
    'admin/createNewClass',
    async (data) => {
        const res = await createNewClass(data)
        return res
    }
)

export const getAllClassThunk = createAsyncThunk(
    'admin/getAllClass',
    async (data) => {
        const res = await getAllClass(data)
        return res
    }
)

export const getClassThunk = createAsyncThunk(
    'admin/getClass',
    async (data) => {
        const res = await getClass(data)
        return res
    }
)

export const deleteClassThunk = createAsyncThunk(
    'admin/deleteClass',
    async (data) => {
        const res = await deleteClass(data)
        return res
    }
)

export const getTeacherListThunk = createAsyncThunk(
    'admin/getTeacherList',
    async (data) => {
        const res = await getTeacherList(data)
        return res
    }
)