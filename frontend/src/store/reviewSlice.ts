// src/store/reviewSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ReviewState {
  // Dictionary: Mapping von username -> Array von Location BSON _ids
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
      
      // Lazy Initialization: Array für den User anlegen, falls es noch nicht existiert
      if (!state.userBaskets[username]) {
        state.userBaskets[username] = [];
      }
      
      const basket = state.userBaskets[username];
      const index = basket.indexOf(locationId);
      
      if (index >= 0) {
        // Mutation: ID ist vorhanden -> aus dem Array entfernen (O(n) shift)
        basket.splice(index, 1);
      } else {
        // ID ist nicht vorhanden -> dem Array anfügen (O(1) push)
        basket.push(locationId);
      }
    }
  }
});

export const { toggleReviewStatus } = reviewSlice.actions;
export default reviewSlice.reducer;