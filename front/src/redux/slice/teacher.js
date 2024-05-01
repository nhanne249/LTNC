import { createSlice } from "@reduxjs/toolkit";
import { getTeacherInfoThunk,updateTeacherInfoThunk,getAllClassThunk,getClassThunk,giveScoreAllClassThunk, giveScoreForStudentThunk} from '../action/teacher'

const teacher = createSlice({
  name: "clearTeacherFuntion",
  initialState: {
    getTeacherInfoThunk: [],
    updateTeacherInfoThunk: [],
    getAllClassThunk: [],
    getClassThunk: [],
    giveScoreAllClassThunk: [],
    giveScoreForStudentThunk: []
  },
  reducers: {
    clearAdminFuntion: (state) => {
      state.getTeacherInfoThunk = []
      state.updateTeacherInfoThunk = []
      state.getAllClassThunk = []
      state.getClassThunk = []
      state.giveScoreAllClassThunk = []
      state.giveScoreForStudentThunk = []
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
    builder.addCase(
      getClassThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.getClassThunk = payload;
        }
      }
    )
    builder.addCase(
      giveScoreAllClassThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.giveScoreAllClassThunk = payload;
        }
      }
    )
    builder.addCase(
      giveScoreForStudentThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.giveScoreForStudentThunk = payload;
        }
      }
    )
  }
});
export const { clearTeacherFuntion
} = teacher.actions;
export default teacher;