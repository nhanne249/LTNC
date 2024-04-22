import { createSlice } from "@reduxjs/toolkit";
import { putAvatar, getAvatarThunk
} from '../action/resources'

const resources = createSlice({
  name: "resourcesFunc",
  initialState: {
      putAvatar: [],
      getAvatarThunk: [],
  },
  reducers: {
    clearAdminFuntion: (state) => {
          state.putAvatar = []
          state.getAvatarThunk = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      putAvatar.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.putAvatar = payload;
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
  }
});
export const { resourcesFunc
} = resources.actions;
export default resources;