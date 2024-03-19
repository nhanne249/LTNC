import { configureStore } from "@reduxjs/toolkit";
// import UserSlice from "./slice/user";
const initialState = {
  profile: { name: "NTK" },
};

const rootReducer = (state = initialState, action) => {
  return state;
};

const store = configureStore({
  reducer: {
    // user: UserSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
