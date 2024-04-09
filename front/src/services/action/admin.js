import { createAsyncThunk } from "@reduxjs/toolkit";
import admin from '../api/admin'

const { getAdmin, 
} = admin

export const getAdminThunk = createAsyncThunk(
    'student/getAdmin',
    async (data) => {
        const res = await getAdmin(data)
        return res
    }
)