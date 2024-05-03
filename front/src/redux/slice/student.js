import { createSlice } from "@reduxjs/toolkit";
import { getStudentInfoThunk,getAllClassesThunk,updateStudentInfoThunk,enrollClassThunk,unenrollClassThunk,instructorEvaluationThunk,deleteReviewsThunk,updateStudentPasswordThunk} from '../action/student'

const student = createSlice({
  name: "clearStudentFuntion",
  initialState: {
    getStudentInfoThunk: [],
    getAllClassesThunk: [],
    updateStudentInfoThunk: [],
    enrollClassThunk: [],
    unenrollClassThunk: [],
    instructorEvaluationThunk: [],
    deleteReviewsThunk: [],
    updateStudentPasswordThunk: []
  },
  reducers: {
    clearAdminFuntion: (state) => {
      state.getInfoThunk = []
      state.getAllClassesThunk = []
      state.updateStudentInfoThunk = []
      state.enrollClassThunk = []
      state.unenrollClassThunk = []
      state.instructorEvaluationThunk = []
      state.deleteReviewsThunk = []
      state.updateStudentPasswordThunk = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getStudentInfoThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.getStudentInfoThunk = payload;
        }
      }
      )
      builder.addCase(
      getAllClassesThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.getAllClassesThunk = payload;
        }
      }
    )
    builder.addCase(
      updateStudentInfoThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.updateStudentInfoThunk = payload;
        }
      }
    )
    builder.addCase(
      enrollClassThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.enrollClassThunk = payload;
        }
      }
    )
    builder.addCase(
      unenrollClassThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.unenrollClassThunk = payload;
        }
      }
    )
    builder.addCase(
      instructorEvaluationThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.instructorEvaluationThunk = payload;
        }
      }
    )
    builder.addCase(
      deleteReviewsThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.deleteReviewsThunk = payload;
        }
      }
    ) 
    builder.addCase(
      updateStudentPasswordThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.updateStudentPasswordThunk = payload;
        }
      }
    )  
  }
});
export const { clearStudentFuntion
} = student.actions;
export default student;