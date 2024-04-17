import { createSlice } from "@reduxjs/toolkit";
import { getAllUserThunk,getUserThunk,getAllStudentsThunk,getAllTeachersThunk,createNewStudentThunk,createNewTeacherThunk,deleteUserThunk,createNewClassThunk,getAllClassThunk, getClassThunk, deleteClassThunk} from '../action/admin'

const admin = createSlice({
  name: "adminFunction",
  initialState: {
    getAllUserThunk: [],
    getUserThunk: [],
    getAllStudentsThunk: [],
    getAllTeachersThunk: [],
    createNewStudentThunk:[],
    createNewTeacherThunk:[],
    deleteUserThunk: [],
    createNewClassThunk: [],
    getAllClassThunk: [],
    getClassThunk: [],
    deleteClassThunk: []
  },
  reducers: {
    clearAdminFuntion: (state) => {
      state.getAllUserThunk = []
      state.getUserThunk= []
      state.getAllStudentsThunk= []
      state.getAllTeachersThunk= []
      state.createNewStudentThunk= []
      state.createNewTeacherThunk= []
      state.deleteUserThunk = []
      state.createNewClassThunk = []
      state.getAllClassThunk = []
      state.getClassThunk = []
      state.deleteClassThunk = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAllUserThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.getAllUserThunk = payload;
        }
      }
    );
    builder.addCase(
      getUserThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.getUserThunk = payload;
      }
      }
    )
    builder.addCase(
      getAllStudentsThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.getAllStudentsThunk = payload;
        }
      }
    )
    builder.addCase(
      getAllTeachersThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.getAllTeachersThunk = payload;
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
      deleteUserThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.deleteUserThunk = payload;
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
      deleteClassThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.deleteClassThunk = payload;
      }
      }
    )
  }
});
export const { clearAdminFuntion
} = admin.actions;
export default admin;