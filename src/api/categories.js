import { createApi } from "@reduxjs/toolkit/query/react";
import GlobalBaseQuery from "./index";

export const categoriesApi = createApi({
  baseQuery: GlobalBaseQuery,
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => "categories",
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
