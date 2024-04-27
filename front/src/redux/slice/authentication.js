import { createSlice } from "@reduxjs/toolkit";
import {loginThunk} from '../action/authentication'

const authentication = createSlice({
  name: "authenticationFunc",
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
export const {authenticationFunc} = authentication.actions;
export default authentication;