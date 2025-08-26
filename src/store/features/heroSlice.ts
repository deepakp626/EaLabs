
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios'; // Import axiosInstance

interface Card {
  title: string;
  image: string; // We'll store the image as a base64 string
}

interface HeroState {
  heroImage: string | null; // We'll store the image as a base64 string
  cards: Card[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: HeroState = {
  heroImage: null,
  cards: [],
  status: 'idle',
  error: null,
};

// Async thunk for fetching hero data
export const fetchHeroData = createAsyncThunk(
  'hero/fetchHeroData',
  async () => {
    const response = await axiosInstance.get('/admin/herosection');
    return response.data;
  }
);


const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    setHeroImage: (state, action: PayloadAction<string>) => {
      state.heroImage = action.payload;
    },
    setCards: (state, action: PayloadAction<Card[]>) => {
      state.cards = action.payload;
    },
    addCard: (state, action: PayloadAction<Card>) => {
      state.cards.push(action.payload);
    },
    updateCard: (state, action: PayloadAction<{ index: number; card: Card }>) => {
      const { index, card } = action.payload;
      if (index >= 0 && index < state.cards.length) {
        state.cards[index] = card;
      }
    },
    removeCard: (state, action: PayloadAction<number>) => {
      state.cards.splice(action.payload, 1);
    },
    clearHeroData: (state) => {
      state.heroImage = null;
      state.cards = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHeroData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // console.log("action.payload:", action.payload[0])
        // Assuming the API returns an object with heroImage and cards
        state.heroImage = action.payload.heroimage;
        state.cards = action.payload[0].cards.map((card: any) => ({
          title: card.title,
          image: `data:image/jpeg;base64,${Buffer.from(card.image).toString('base64')}`
        }));
      })
      .addCase(fetchHeroData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch hero data';
      });
  },
});

export const {
  setHeroImage,
  setCards,
  addCard,
  updateCard,
  removeCard,
  clearHeroData,
} = heroSlice.actions;

export default heroSlice.reducer;
