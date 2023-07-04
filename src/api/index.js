import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const GlobalBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/",
  prepareHeaders: (headers) => {
    let token = localStorage.getItem("access_token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export default GlobalBaseQuery;
