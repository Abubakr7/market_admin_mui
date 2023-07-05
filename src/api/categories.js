import { createApi } from "@reduxjs/toolkit/query/react";
import GlobalBaseQuery, { providesList } from "./index";

export const categoriesApi = createApi({
  baseQuery: GlobalBaseQuery,
  tagTypes: ["Category"],
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => "categories",
      providesTags: (result) => providesList(result, "Category"),
    }),
    addCategory: build.mutation({
      query: (body) => ({
        url: "categories",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
    editCategory: build.mutation({
      query: ({ id, ...body }) => ({
        url: `categories/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
} = categoriesApi;
