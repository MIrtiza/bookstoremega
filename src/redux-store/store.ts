import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './features/cartSlice';

const persistConfig = {
    key: 'root',
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    cart: persistedReducer,
  },
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
