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

        //edit car
        updateCarDetails: builder.mutation({
            query: ({ cardId, carUpdateData }) => ({
                url: `agency-admin/cars/${cardId}/`,
                method: "PATCH",
                body: carUpdateData,
            }),
            invalidatesTags: ["cars"],
        }),


        //agent list
        agentList: builder.query({
            query: () => "agency-admin/agents/list/",
            providesTags: ["agents"]
        }),

        //add new agent
        addNewAgent: builder.mutation({
            query: (agentData) => ({
                url: "agency-admin/agents/",
                method: "POST",
                body: agentData
            }),
            invalidatesTags: ["agents"]
        }),

        //edit agent
        updateAgentDetails: builder.mutation({
            query: ({ id, data }) => ({
                url: `agency-admin/agents/${id}/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["agents"],
        }),

    }),
})


export const {
    useLoggedInUserMutation,

    //get cars
    useCarListMutation,
    useAddNewCarMutation,
    //edit car
    useUpdateCarDetailsMutation,

    //agent list
    useAgentListQuery,
    //add new agent
    useAddNewAgentMutation,
    //edit agent
    useUpdateAgentDetailsMutation,
} = baseApi