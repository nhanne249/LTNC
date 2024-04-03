import { createSlice } from "@reduxjs/toolkit";
import { registerStudentThunk, 
  // loginThunk
} from '../action/user'

const authentication = createSlice({
  name: "authentication",
  initialState: {
    registerStudent:[],
    login:[],
  },
  reducers: {
    registerStudent: (state) => {
      state.registerStudentThunk = [];
      // state.loginThunk = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      registerStudentThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.registerStudentThunk = payload;
      }
      }
    )
    // builder.addCase(
    //   loginThunk.fulfilled,
    //   (state, { payload }) => {
    //     if (payload) {
    //       state.loginThunk = payload;
    //   }
    //   }
    // )
  }
});
export const { registerStudent, 
  // login 
} = authentication.actions;
export default authentication;