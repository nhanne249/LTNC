import { createSlice } from "@reduxjs/toolkit";
import {loginThunk} from '../action/authentication'

const authentication = createSlice({
  name: "authentication",
  initialState: {
    login:[],
  },
  reducers: {
    registerStudent: (state) => {
      state.loginThunk = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.loginThunk = payload;
      }
      }
    )
  }
});
export const { registerStudent, 
  login 
} = authentication.actions;
export default authentication;