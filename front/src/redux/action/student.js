import { createAsyncThunk } from "@reduxjs/toolkit";
import student from '../api/student'

const { getStudentInfo,getAllClasses,updateStudent,enrollClass,unenrollClass,instructorEvaluation
} = student

export const getStudentInfoThunk = createAsyncThunk(
    'student/getStudentInfo',
    async (data) => {
        const res = await getStudentInfo(data)
        return res
    }
)

export const getAllClassesThunk = createAsyncThunk(
    'student/getAllClasses',
    async (data) => {
        const res = await getAllClasses(data)
        return res
    }
)

export const updateStudentThunk = createAsyncThunk(
    'student/updateStudent',
    async (data) => {
        const res = await updateStudent(data)
        return res
    }
)

export const enrollClassThunk = createAsyncThunk(
    'student/enrollClass',
    async (data) => {
        const res = await enrollClass(data)
        return res
    }
)

export const unenrollClassThunk = createAsyncThunk(
    'student/unenrollClass',
    async (data) => {
        const res = await unenrollClass(data)
        return res
    }
)

export const instructorEvaluationThunk = createAsyncThunk(
    'student/instructorEvaluation',
    async (data) => {
        const res = await instructorEvaluation(data)
        return res
    }
)
