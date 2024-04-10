import { createAsyncThunk } from "@reduxjs/toolkit";
import authentication from '../api/authentication'

const {login} = authentication

export const loginThunk = createAsyncThunk(
    'student/login',
    async (data) => {
        const res = await login(data)
        return res
    }
)
