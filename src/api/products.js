import { createApi } from "@reduxjs/toolkit/query/react";
import GlobalBaseQuery, { providesList } from "./index";

export const productsApi = createApi({
  baseQuery: GlobalBaseQuery,
  tagTypes: ["Product"],
  reducerPath: "products",
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => "products",
      providesTags: (result) => providesList(result, "Product"),
    }),
    addProduct: build.mutation({
      query: (body) => ({
        url: "products",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    editProduct: build.mutation({
      query: ({ id, ...body }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
} = productsApi;
