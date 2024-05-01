import { createAsyncThunk } from "@reduxjs/toolkit";
import review from '../api/review'

const { getAllReview
} = review


export const getAllReviewThunk = createAsyncThunk(
    'review/getAllReview',
    async (data) => {
        const res = await getAllReview(data)
        return res
    }
)