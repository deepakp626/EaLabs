// lib/store.ts
import { configureStore } from '@reduxjs/toolkit';
import heroReducer from './features/heroSlice'; // Example slice
import checkupPackagesReducer from './features/checkupPackagesSlice'; // Example slice
import reviewsReducer from '@/store/features/reviewSlice'; // Example slice


export const makeStore = () => {
  return configureStore({
    reducer: {
      hero: heroReducer,
      reviews: reviewsReducer,
      checkupPackages: checkupPackagesReducer,
      // Add other slices here
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];