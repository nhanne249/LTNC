import { createAsyncThunk } from "@reduxjs/toolkit";
import admin from '../api/admin'

const { getAllStudentByAdmin, 
} = admin

export const getAllStudentByAdminThunk = createAsyncThunk(
    'student/getAllStudentByAdmin',
    async (data) => {
        const res = await getAllStudentByAdmin(data)
        return res
    }
)