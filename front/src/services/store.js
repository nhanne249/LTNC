import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./slice/authentication";
const initialState = {
  profile: { name: "NTK" },
};

const rootReducer = (state = initialState, action) => {
  return state;
};

const store = configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
