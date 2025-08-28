import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';

// Define the shape of a single review
interface Review {
  _id: string;
  userName: string;
  userReview: string;
  rating: number;
  image: string; // Assuming the image is a URL or base64 string
}

// Define the shape of our state
interface ReviewState {
  reviews: Review[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: ReviewState = {
  reviews: [],
  status: 'idle',
  error: null,
};

// Async thunk for fetching reviews
export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async () => {
    const response = await axiosInstance.get('/api/admin/reviews');
    return response.data.data;
  }
);

// Create the slice
const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch reviews';
      });
  },
});

// Export reducer
export default reviewSlice.reducer;