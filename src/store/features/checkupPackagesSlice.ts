
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';

// Define the shape of our state
interface CheckupPackagesState {
  categories: string[];
  cards: PackageCard[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define the PackageCard interface if not already defined
interface PackageCard {
  image: string | File;
  title: string;
  testCount: number;
  category: string;
}

// Initial state
const initialState: CheckupPackagesState = {
  categories: [],
  cards: [],
  status: 'idle',
  error: null,
};

// Async thunk for fetching checkup packages
export const fetchCheckupPackages = createAsyncThunk(
  'checkupPackages/fetchCheckupPackages',
  async () => {
    const response = await axiosInstance.get('/admin/checkup-packages');
    return response.data;
  }
);

// Async thunk for saving checkup packages
export const saveCheckupPackages = createAsyncThunk(
  'checkupPackages/saveCheckupPackages',
  async (data: { categories: string[], cards: PackageCard[] }) => {
    // Convert File objects to base64 strings
    const cardsWithBase64Images = await Promise.all(data.cards.map(async (card) => {
      if (card.image instanceof File) {
        const base64Image = await fileToBase64(card.image);
        return { ...card, image: base64Image };
      }
      return card;
    }));

    // Create the JSON payload
    const jsonPayload = JSON.stringify({
      categories: data.categories,
      cards: cardsWithBase64Images
    });


    const response = await axiosInstance.post('/admin/checkup-packages', jsonPayload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  }
);

// Helper function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// Create the slice
const checkupPackagesSlice = createSlice({
  name: 'checkupPackages',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<string>) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(category => category !== action.payload);
    },
    addCard: (state, action: PayloadAction<PackageCard>) => {
      state.cards.push(action.payload);
    },
    removeCard: (state, action: PayloadAction<number>) => {
      state.cards.splice(action.payload, 1);
    },
    updateCard: (state, action: PayloadAction<{ index: number, card: PackageCard }>) => {
      const { index, card } = action.payload;
      state.cards[index] = card;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheckupPackages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCheckupPackages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        //  console.log("action.payload:", action.payload.data)
        // console.log("action.payload:", action.payload.data[0].cards)
        state.categories = action.payload.data[0].categories;
        state.cards = action.payload.data[0].cards;
      })
      .addCase(fetchCheckupPackages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch checkup packages';
      })
      .addCase(saveCheckupPackages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveCheckupPackages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // console.log('Response from server:', action.payload);
        // Optionally update state with the response from the server
        state.categories = action.payload.data.categories;
        state.cards = action.payload.data.cards;
      })
      .addCase(saveCheckupPackages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to save checkup packages';
      });
  },
});

// Export actions
export const { addCategory, removeCategory, addCard, removeCard, updateCard } = checkupPackagesSlice.actions;

// Export reducer
export default checkupPackagesSlice.reducer;
