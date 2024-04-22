import { createAsyncThunk } from "@reduxjs/toolkit";
import resources from '../api/resources'

const { putAvatar,getAvatar
} = resources

export const putAvatarThunk = createAsyncThunk(
    'resources/putAvatar',
    async (data) => {
        const res = await putAvatar(data)
        return res
    }
)

export const getAvatarThunk = createAsyncThunk(
    'resources/getAvatar',
    async (data) => {
        const res = await getAvatar(data)
        return res
    }
)

