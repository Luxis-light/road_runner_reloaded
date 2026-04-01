import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ReviewState {
  userBaskets: Record<string, string[]>;
}

const initialState: ReviewState = {
  userBaskets: {},
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    toggleReviewStatus: (state, action: PayloadAction<{ username: string; locationId: string }>) => {
      const { username, locationId } = action.payload;
      
      if (!state.userBaskets[username]) {
        state.userBaskets[username] = [];
      }
      
      const basket = state.userBaskets[username];
      const index = basket.indexOf(locationId);
      
      if (index >= 0) {
        basket.splice(index, 1);
      } else {
        basket.push(locationId);
      }
    },
  removeFromBasket: (state, action: PayloadAction<{ username: string; locationId: string }>) => {
      const { username, locationId } = action.payload;
      if (state.userBaskets[username]) {
        state.userBaskets[username] = state.userBaskets[username].filter(
          id => id !== locationId
        );
      }
    }
  },
});


export const { toggleReviewStatus, removeFromBasket } = reviewSlice.actions;
export default reviewSlice.reducer;