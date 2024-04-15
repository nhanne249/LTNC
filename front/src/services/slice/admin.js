import { createSlice } from "@reduxjs/toolkit";
import { getAllUserByAdminThunk,getStudentByIdThunk,createNewStudentThunk,createNewTeacherThunk,deleteUserByIdThunk,createNewCourseThunk,deleteCourseThunk,createNewClassThunk,
} from '../action/admin'

const admin = createSlice({
  name: "adminFunction",
  initialState: {
    getAllUserByAdminThunk: [],
    getStudentByIdThunk: [],
    createNewStudentThunk: [],
    createNewTeacherThunk: [],
    deleteUserByIdThunk:[],
    createNewCourseThunk:[],
    deleteCourseThunk: [],
    createNewClassThunk:[],
  },
  reducers: {
    clearAdminFuntion: (state) => {
      state.getAllUserByAdminThunk = [],
      state.getStudentByIdThunk= [],
      state.createNewStudentThunk= [],
      state.createNewTeacherThunk= [],
      state.deleteUserByIdThunk= [],
      state.createNewCourseThunk= [],
      state.deleteCourseThunk= [],
      state.createNewClassThunk= []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAllUserByAdminThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.getAllUserByAdminThunk = payload;
        }
      }
    );
    builder.addCase(
      getStudentByIdThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.getStudentByIdThunk = payload;
      }
      }
    )
    builder.addCase(
      createNewStudentThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.createNewStudentThunk = payload;
        }
      }
    )
    builder.addCase(
      createNewTeacherThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.createNewTeacherThunk = payload;
      }
      }
    )
    builder.addCase(
      deleteUserByIdThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.deleteUserByIdThunk = payload;
      }
      }
    )
    builder.addCase(
      createNewCourseThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.createNewCourseThunk = payload;
      }
      }
    )
    builder.addCase(
      deleteCourseThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.deleteCourseThunk = payload;
      }
      }
    )
    builder.addCase(
      createNewClassThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.createNewClassThunk = payload;
      }
      }
    )
    
  }
});
export const { clearAdminFuntion
} = admin.actions;
export default admin;