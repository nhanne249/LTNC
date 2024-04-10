import { createSlice } from "@reduxjs/toolkit";
import { getAllStudentByAdminThunk
} from '../action/admin'

const admin = createSlice({
  name: "adminFunction",
  initialState: {
    getAllStudentByAdminThunk:[],
  },
  reducers: {
    admin: (state) => {
      state.getAllStudentByAdminThunk = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAllStudentByAdminThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.getAllStudentByAdminThunk = payload;
      }
      }
    )
  }
});
export const { getAllStudentByAdmin
} = admin.actions;
export default admin;