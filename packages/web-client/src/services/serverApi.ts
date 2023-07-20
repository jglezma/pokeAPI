import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IPokemonCaptureRequest {
  username: string;
  pokemonId: number;
}

export const serverApi = createApi({
  reducerPath: "serverApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_URL }),
  endpoints: (builder) => ({
    capturePokemon: builder.mutation<void, IPokemonCaptureRequest>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCapturePokemonMutation } = serverApi;
