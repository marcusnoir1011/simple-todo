import { apiSlice } from "./apiSlice";

interface loginInput {
  email: string;
  password: string;
}

interface registerInput extends loginInput {
  name: string;
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
    register: build.mutation({
      query: (data: registerInput) => ({
        url: "api/auth/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export default userApiSlice;
export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  userApiSlice;
