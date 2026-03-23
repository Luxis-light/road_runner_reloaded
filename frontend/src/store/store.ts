// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer, 
  FLUSH, 
  REHYDRATE, 
  PAUSE, 
  PERSIST, 
  PURGE, 
  REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Bindet localStorage API an
import reviewReducer from './reviewSlice';

// Persistenz-Konfiguration
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};


const persistedReviewReducer = persistReducer(persistConfig, reviewReducer);

export const store = configureStore({
  reducer: {
    review: persistedReviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;