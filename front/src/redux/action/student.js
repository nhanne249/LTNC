import { createAsyncThunk } from "@reduxjs/toolkit";
import student from '../api/student'

const { getStudentInfo,getAllClasses,updateStudentInfo,enrollClass,unenrollClass,instructorEvaluation,deleteReviews,updateStudentPassword
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

export const updateStudentInfoThunk = createAsyncThunk(
    'student/updateStudentInfo',
    async (data) => {
        const res = await updateStudentInfo(data)
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

export const deleteReviewsThunk = createAsyncThunk(
    'student/deleteReviews',
    async (data) => {
        const res = await deleteReviews(data)
        return res
    }
)

export const updateStudentPasswordThunk = createAsyncThunk(
    'student/updateStudentPassword',
    async (data) => {
        const res = await updateStudentPassword(data)
        return res
    }
)