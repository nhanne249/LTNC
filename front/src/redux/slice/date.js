import { createSlice } from "@reduxjs/toolkit";
import { getAllDaysThunk, getDayThunk
} from '../action/date'

const admin = createSlice({
  name: "dateFunc",
  initialState: {
      getAllDaysThunk: [],
      getDayThunk: [],
  },
  reducers: {
    clearAdminFuntion: (state) => {
          state.getAllDaysThunk = []
          state.getDayThunk = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAllDaysThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.getAllDaysThunk = payload;
        }
      }
      );
      builder.addCase(
      getDayThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.getDayThunk = payload;
        }
      }
    );
  }
});
export const { dateFunc
} = date.actions;
export default admin;