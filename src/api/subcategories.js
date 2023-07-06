import { createApi } from "@reduxjs/toolkit/query/react";
import GlobalBaseQuery, { providesList } from "./index";

export const subcategoriesApi = createApi({
  baseQuery: GlobalBaseQuery,
  tagTypes: ["SubCategory"],
  reducerPath: "subcategories",
  endpoints: (build) => ({
    getSubCategories: build.query({
      query: () => "subcategories",
      providesTags: (result) => providesList(result, "SubCategory"),
    }),
    addSubCategory: build.mutation({
      query: (body) => ({
        url: "subcategories",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "SubCategory", id: "LIST" }],
    }),
    editSubCategory: build.mutation({
      query: ({ id, ...body }) => ({
        url: `subcategories/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "SubCategory", id: "LIST" }],
    }),
    deleteSubCategory: build.mutation({
      query: (id) => ({
        url: `subcategories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "SubCategory", id: "LIST" }],
    }),
  }),
});

export const {
  useGetSubCategoriesQuery,
  useAddSubCategoryMutation,
  useEditSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subcategoriesApi;
