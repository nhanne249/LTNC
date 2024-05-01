import { createSlice } from "@reduxjs/toolkit";
import { putAvatarThunk, getAvatarThunk,facultiesListThunk,createFacultyThunk,createSubjectThunk,deleteSubjectThunk,deleteFacultyThunk,getAllClassResourceThunk
} from '../action/resources'

const resources = createSlice({
  name: "resourcesFunc",
  initialState: {
    putAvatarThunk: [],
    getAvatarThunk: [],
    facultiesListThunk: [],
    createFacultyThunk: [],
    createSubjectThunk: [],
    deleteSubjectThunk: [],
    deleteFacultyThunk: [],
    getAllClassResourceThunk: []
  },
  reducers: {
    clearAdminFuntion: (state) => {
      state.putAvatarThunk = []
      state.getAvatarThunk = []
      state.facultiesListThunk = []
      state.createFacultyThunk = []
      state.createSubjectThunk = []
      state.deleteSubjectThunk = []
      state.deleteFacultyThunk = []
      state.getAllClassResourceThunk= []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      putAvatarThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.putAvatarThunk = payload;
        }
      }
      );
      builder.addCase(
      getAvatarThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.getAvatarThunk = payload;
        }
      }
    );
    builder.addCase(
      facultiesListThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.facultiesListThunk = payload;
        }
      }
    );
    builder.addCase(
      createFacultyThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.createFacultyThunk = payload;
        }
      }
    );
    builder.addCase(
      createSubjectThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.createSubjectThunk = payload;
        }
      }
    );
    builder.addCase(
      deleteSubjectThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.deleteSubjectThunk = payload;
        }
      }
    );
    builder.addCase(
      deleteFacultyThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.deleteFacultyThunk = payload;
        }
      }
    );
    builder.addCase(
      getAllClassResourceThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.getAllClassResourceThunk = payload;
        }
      }
    );
  }
});
export const { resourcesFunc
} = resources.actions;
export default resources;