import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "./slices/apiSlice";
import discoverReducer from "./slices/discover";
import myListReducer from "./slices/myList";

const store = configureStore({
  reducer: {
    discover: discoverReducer,
    myList: myListReducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

