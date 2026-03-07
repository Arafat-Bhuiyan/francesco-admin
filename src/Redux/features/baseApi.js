import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://10.10.13.16:8888/api/v1/',

        prepareHeaders: (headers, { endpoint }) => {

            const authEndpoints = [
                "loggedInUser",
                "forgetPassword",
                "otpVerification",
                "resetPassword",
            ];

            if (!authEndpoints.includes(endpoint)) {
                const token = localStorage.getItem("access_token");
                if (token) {
                    headers.set("Authorization", `Bearer ${token}`);
                }
            }
            return headers;
        },
    }),


    endpoints: (builder) => ({

        //login user
        loggedInUser: builder.mutation({
            query: (loginData) => ({
                url: "auth/login/",
                method: "POST",
                body: loginData

            })
        })
    }),
})


export const {
    useLoggedInUserMutation,
} = baseApi