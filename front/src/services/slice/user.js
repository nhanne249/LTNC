import { createSlice } from "@reduxjs/toolkit";
// import { loginAuthenticateThunk, } from 'src/redux/action/user'

const authentication = createSlice({
  name: "authentication",
  initialState: {
    // loginAuthenticateThunk:[],
  },
  reducers: {
    login: (state) => {
      // state.loginAuthenticate = [];
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(
    //   loginAuthenticateThunk.fulfilled,
    //   (state, { payload }) => {
    //     if (payload) {
    //       state.loginAuthenticateThunk = payload;
    //   }
    //   }
    // )
  }
});
export const { loginRole } = authentication.actions;
export default authentication;