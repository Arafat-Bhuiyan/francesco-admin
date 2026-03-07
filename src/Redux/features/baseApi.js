import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';

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
                const token = Cookies.get("access_token");
                if (token) {
                    headers.set("Authorization", `Bearer ${token}`);
                }
            }
            return headers;
        },
    }),

    tagTypes: ["cars"],

    endpoints: (builder) => ({

        //login user
        loggedInUser: builder.mutation({
            query: (loginData) => ({
                url: "auth/login/",
                method: "POST",
                body: loginData

            })
        }),


        //get car
        carList: builder.mutation({
            query: () => "agency-admin/cars/",
            providesTags: ["cars"]
        }),

        //add new car
        addNewCar: builder.mutation({
            query: (carData) => ({
                url: "agency-admin/cars/",
                method: "POST",
                body: carData
            }),
            invalidatesTags: ["cars"]
        }),

    }),
})


export const {
    useLoggedInUserMutation,

    //get cars
    useCarListMutation,
    useAddNewCarMutation,
} = baseApi