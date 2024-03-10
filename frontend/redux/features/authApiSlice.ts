import { apiSlice } from "../services/apiSlice";

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveUser: builder.query<User, void>({
      query: () => "/users/me/",
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/token/",
        method: "POST",
        body: { email, password },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout/",
        method: "POST",
      }),
    }),
    verify: builder.mutation({
      query: () => ({
        url: "token/verify/",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRetrieveUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useVerifyMutation,
} = authApiSlice;
