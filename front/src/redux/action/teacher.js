import { createAsyncThunk } from "@reduxjs/toolkit";
import teacher from '../api/teacher'

const { getTeacherInfo,updateTeacherInfo,getAllClass
} = teacher

export const getTeacherInfoThunk = createAsyncThunk(
    'teacher/getTeacherInfo',
    async (data) => {
        const res = await getTeacherInfo(data)
        return res
    }
)

export const updateTeacherInfoThunk = createAsyncThunk(
    'teacher/updateTeacherInfo',
    async (data) => {
        const res = await updateTeacherInfo(data)
        return res
    }
)

export const getAllClassThunk = createAsyncThunk(
    'teacher/getAllClass',
    async (data) => {
        const res = await getAllClass(data)
        return res
    }
)
