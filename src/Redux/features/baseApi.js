import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';
import { url } from 'zod';

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

    tagTypes: ["cars", "agents", "bookings", "quotationPricing", "customers", "paymentAndDeposite", "settings", "agencyList", "globalPricingRules", "paymentAndCommission"],

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

        //booking management
        bookingList: builder.query({
            query: () => "agency-admin/bookings/",
            providesTags: ["bookings"]
        }),

        //booking details
        bookingDetails: builder.query({
            query: (bookingId) => `agency-admin/bookings/${bookingId}/`,
        }),

        //quotation pricing
        quotationPricing: builder.query({
            query: () => "agency-admin/quotations/",
            providesTags: ["quotationPricing"]
        }),

        //details
        quotationDetails: builder.query({
            query: (quotationId) => `agency-admin/quotations/${quotationId}/`,
        }),

        //customer management
        customerList: builder.query({
            query: () => "agency-admin/customers/",
            providesTags: ["customers"]
        }),

        //details
        customerDetails: builder.query({
            query: (customerId) => `agency-admin/customers/${customerId}/`,
        }),

        //payment and deposite
        paymentAndDeposite: builder.query({
            query: () => "agency-admin/payments-deposits/",
            providesTags: ["paymentAndDeposite"]
        }),

        //report and analytics
        reportAnalytics: builder.query({
            query: () => "agency-admin/reports-analytics/"
        }),

        //settings
        settingsInfo: builder.query({
            query: () => "agency-admin/settings/",
            providesTags: "settings"
        }),

        updateSettings: builder.mutation({
            query: ({ settingsData }) => ({
                url: "agency-admin/settings/",
                method: "PATCH",
                body: settingsData
            }),
            invalidatesTags: ["settings"]
        }),

        //agency dashbord data
        dashboardData: builder.query({
            query: () => "agency-admin/dashboard/"
        }),

        //vehicle-activity
        vehicleActivity: builder.query({
            query: () => "agency-admin/vehicle-activity/"
        }),

        //super admin dashboard
        superAdminDashboardData: builder.query({
            query: () => "super-admin/dashboard/"
        }),



        //agency management
        getAgencyList: builder.query({
            query: () => "super-admin/agencies/list/",
            providesTags: ["agencyList"]
        }),

        //add new agency
        addNewAgency: builder.mutation({
            query: (agencyData) => ({
                url: "super-admin/agencies/",
                method: "POST",
                body: agencyData
            }),
            invalidatesTags: ["agencyList"]
        }),

        //active toggle Agency or disabled
        toggleAgencyStatus: builder.mutation({
            query: ({ id, suspend }) => ({
                url: `super-admin/agencies/${id}/toggle-status/`,
                method: "PATCH",
                body: { suspend },
            }),
            invalidatesTags: ["agencyList"]
        }),

        //agency details
        agencyDetails: builder.query({
            query: (id) => `super-admin/agencies/${id}/`,
            providesTags: ["agencyList"]
        }),

        //comission
        updateCommission: builder.mutation({
            query: ({ id, commissionData }) => ({
                url: `super-admin/agencies/${id}/commission/`,
                method: "PATCH",
                body: commissionData,
            }),
            invalidatesTags: ["agencyList"]
        }),

        //global pricing rules
        globalPricingRules: builder.query({
            query: () => "super-admin/global-pricing-rules/",
            providesTags: ["globalPricingRules"]
        }),

        //update
        updateGlobalPricingRules: builder.mutation({
            query: ({ globalPricingRulesData }) => ({
                url: "super-admin/global-pricing-rules/",
                method: "PATCH",
                body: globalPricingRulesData
            }),
            invalidatesTags: ["globalPricingRules"]
        }),




        //payment and commission
        paymentAndCommissionAdmin: builder.query({
            query: () => "super-admin/payments-commission/",
            providesTags: ["paymentAndCommission"]
        }),

        //details
        paymentAndCommissionDetails: builder.query({
            query: (id) => `super-admin/payments-commission/payout/${id}/`,
            providesTags: ["paymentAndCommission"]
        }),

        //process payout
        processPayout: builder.mutation({
            query: (id) => ({
                url: `super-admin/payments-commission/payout/${id}/process/`,
                method: "POST",
            }),
            invalidatesTags: ["paymentAndCommission"]
        }),


        //operation overview
        operationOverview: builder.query({
            query: (tab) => `super-admin/operation-overview/?tab=${tab}`,
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

    //booking list
    useBookingListQuery,
    //booking details
    useBookingDetailsQuery,

    //quotation pricing
    useQuotationPricingQuery,
    //quotation details
    useQuotationDetailsQuery,

    //customer management
    useCustomerListQuery,
    //customer details
    useCustomerDetailsQuery,

    //payment and deposite
    usePaymentAndDepositeQuery,

    //report 
    useReportAnalyticsQuery,

    //settings
    useSettingsInfoQuery,
    useUpdateSettingsMutation,

    //agency dashboard home
    useDashboardDataQuery,
    useVehicleActivityQuery,




    //super admin dashboard
    useSuperAdminDashboardDataQuery,

    //agency management
    useGetAgencyListQuery,
    useAddNewAgencyMutation,
    useToggleAgencyStatusMutation,
    useAgencyDetailsQuery,
    useUpdateCommissionMutation,


    //global pricing rules
    useGlobalPricingRulesQuery,
    useUpdateGlobalPricingRulesMutation,


    //payment and commission
    usePaymentAndCommissionAdminQuery,
    usePaymentAndCommissionDetailsQuery,
    useProcessPayoutMutation,


    //operation overview
    useOperationOverviewQuery,



} = baseApi