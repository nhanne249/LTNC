import { createSlice } from "@reduxjs/toolkit";
import { putAvatarThunk, getAvatarThunk,facultiesListThunk,createFacultyThunk,createSubjectThunk,deleteSubjectThunk,deleteFacultyThunk,getAllClassResourceThunk,deleteResourceThunk,getResourceThunk
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
    getAllClassResourceThunk: [],
    deleteResourceThunk: [],
    getResourceThunk: []
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
      state.getAllClassResourceThunk = []
      state.deleteResourceThunk = []
      state.getResourceThunk = []
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
    builder.addCase(
      deleteResourceThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.deleteResourceThunk = payload;
        }
      }
    );
    builder.addCase(
      getResourceThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.getResourceThunk = payload;
        }
      }
    );
  }
});
export const { resourcesFunc
} = resources.actions;
export default resources;