import { createSlice } from "@reduxjs/toolkit";
import { getStudentInfoThunk,getAllClassesThunk,updateStudentThunk,enrollClassThunk,unenrollClassThunk,instructorEvaluationThunk,deleteReviewsThunk} from '../action/student'

const student = createSlice({
  name: "clearStudentFuntion",
  initialState: {
    getStudentInfoThunk: [],
    getAllClassesThunk: [],
    updateStudentThunk: [],
    enrollClassThunk: [],
    unenrollClassThunk: [],
    instructorEvaluationThunk: [],
    deleteReviewsThunk: []
  },
  reducers: {
    clearAdminFuntion: (state) => {
      state.getInfoThunk = []
      state.getAllClassesThunk = []
      state.updateStudentThunk = []
      state.enrollClassThunk = []
      state.unenrollClassThunk = []
      state.instructorEvaluationThunk = []
      state.deleteReviewsThunk = []
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
      updateStudentThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.updateStudentThunk = payload;
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
  }
});
export const { clearStudentFuntion
} = student.actions;
export default student;