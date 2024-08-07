import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import Categories from "@store/Category/CategoriesSlice";
import Products from "@store/Products/ProductsSlice";
import Cart from "./Cart/CartSlice";
import storage from "redux-persist/lib/storage";
import wishlist from "./wishlist/wishlistSlice";
import auth from "./auth/authSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"],
};

const CartPersistConfig = {
  key: "Cart",
  storage,
  whitelist: ["items"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "accessToken"],
};

const rootReducer = combineReducers({
  Categories,
  Products,
  Cart: persistReducer(CartPersistConfig, Cart),
  wishlist: wishlist,
  auth: persistReducer(authPersistConfig, auth),
});
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
