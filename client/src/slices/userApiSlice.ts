import { apiSlice } from "./apiSlice";

interface loginInput {
  email: string;
  password: string;
}

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data: loginInput) => ({
        url: "api/auth/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: "api/auth/logout",
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export default userApiSlice;
export const { useLoginMutation, useLogoutMutation } = userApiSlice;
