import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import searchReducer from './features/searchSlice';
import cartReducer from './features/cartSlice';
import savedItemsReducer from './features/saveSlice';

const persistConfig = {
    key: 'root',
    storage,
  };

  // Persist config for saved items
const savedItemsPersistConfig = {
    key: 'savedItems',
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, cartReducer); // used for store the add to cart item , even after refresh
  const persistedSavedItemsReducer = persistReducer(savedItemsPersistConfig, savedItemsReducer);

const store = configureStore({
  reducer: {
    cart: persistedReducer,
    search: searchReducer,
    savedItems: persistedSavedItemsReducer,
  },
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
