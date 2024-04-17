import { createAsyncThunk } from "@reduxjs/toolkit";
import date from '../api/date'

const { getAllDays, getDay
} = date

export const getAllDaysThunk = createAsyncThunk(
    'student/getAllDays',
    async (data) => {
        const res = await getAllDays(data)
        return res
    }
)

export const getDayThunk = createAsyncThunk(
    'student/getDay',
    async (data) => {
        const res = await getDay(data)
        return res
    }
)