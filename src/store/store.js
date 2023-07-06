import { configureStore } from "@reduxjs/toolkit";
import { categoriesApi } from "../api/categories";
import { subcategoriesApi } from "../api/subcategories";
import { brandsApi } from "../api/brands";

export const store = configureStore({
  reducer: {
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [subcategoriesApi.reducerPath]: subcategoriesApi.reducer,
    [brandsApi.reducerPath]: brandsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoriesApi.middleware,
      subcategoriesApi.middleware,
      brandsApi.middleware
    ),
});
