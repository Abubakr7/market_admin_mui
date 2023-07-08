import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { destroyToken } from "../utils/token";

const BaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/",
  prepareHeaders: (headers) => {
    let token = localStorage.getItem("access_token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const GlobalBaseQuery = async (args, api, extraOptions) => {
  let result = await BaseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    destroyToken();
  }
  return result;
};

export function providesList(resultsWithIds, tagType) {
  return resultsWithIds
    ? [
        { type: tagType, id: "LIST" },
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
      ]
    : [{ type: tagType, id: "LIST" }];
}

export default GlobalBaseQuery;
