import { createSlice } from "@reduxjs/toolkit";
import { getAllReviewThunk
} from '../action/review'

const review = createSlice({
  name: "reviewFunc",
  initialState: {
      getAllReviewThunk: []
  },
  reducers: {
    clearAdminFuntion: (state) => {
          state.getAllReviewThunk = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAllReviewThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.getAllReviewThunk = payload;
        }
      }
    );
  }
});
export const { reviewFunc
} = review.actions;
export default review;