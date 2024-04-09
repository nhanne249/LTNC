import { createSlice } from "@reduxjs/toolkit";
import { getAdminThunk
} from '../action/user'

const admin = createSlice({
  name: "adminFunction",
  initialState: {
    getAdminThunk:[],
  },
  reducers: {
    admin: (state) => {
      state.getAdminThunk = [];
      state.loginThunk = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAdminThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.getAdminThunk = payload;
      }
      }
    )
  }
});
export const { getAdmin
} = admin.actions;
export default admin;