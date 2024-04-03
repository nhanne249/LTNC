import { createAsyncThunk } from "@reduxjs/toolkit";
import user from '../api/user'

const { registerStudent, 
    // login
} = user

export const registerStudentThunk = createAsyncThunk(
    'student/registerStudent',
    async (data) => {
        const res = await registerStudent(data)
        return res
    }
)

// export const loginThunk = createAsyncThunk(
//     'student/login',
//     async (data) => {
//         const res = await login(data)
//         return res
//     }
// )
