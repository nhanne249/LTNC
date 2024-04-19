import { createSlice } from "@reduxjs/toolkit";
import {loginThunk} from '../action/authentication'

const authentication = createSlice({
  name: "authentication",
  initialState: {
    login:[],
  },
  reducers: {
    
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
export const {} = authentication.actions;
export default authentication;