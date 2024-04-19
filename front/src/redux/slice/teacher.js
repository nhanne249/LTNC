import { createSlice } from "@reduxjs/toolkit";
import { getTeacherInfoThunk,updateTeacherInfoThunk,getAllClassThunk} from '../action/teacher'

const teacher = createSlice({
  name: "clearTeacherFuntion",
  initialState: {
      getTeacherInfoThunk: [],
      updateTeacherInfoThunk: [],
      getAllClassThunk: [],
  },
  reducers: {
    clearAdminFuntion: (state) => {
          state.getTeacherInfoThunk = []
          state.updateTeacherInfoThunk = []
          state.getAllClassThunk = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getTeacherInfoThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.getTeacherInfoThunk = payload;
        }
      }
    )
    builder.addCase(
      updateTeacherInfoThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.updateTeacherInfoThunk = payload;
        }
      }
    )
    builder.addCase(
      getAllClassThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.getAllClassThunk = payload;
        }
      }
    )
  }
});
export const { clearTeacherFuntion
} = teacher.actions;
export default teacher;