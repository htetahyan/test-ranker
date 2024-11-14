import baseApi from "./BaseQuery";

export const AccountQuery=baseApi.injectEndpoints({

    endpoints: (builder) => ({
        account: builder.mutation({
            query: (body) => ({
                url: '/api/account',
                method: 'POST',
                body:JSON.stringify(body)
            })
        }),
        PostSession: builder.mutation({
            query: ({sessionId}:{sessionId:string}) => ({
                url: '/api/session',
                method: 'POST',
                body:JSON.stringify({sessionId})
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/api/account/logout',
                method: 'DELETE',
            })
        }),
        verifyEmail: builder.mutation({
            query: () => ({
                url: '/api/account/verify',
                method: 'POST',
            })
        }),
        getSubscriptionBySubscriptionId: builder.query({
            query: ({subscriptionId}) => ({
                url: `/api/account/subscription/${subscriptionId}`,
            })
        }),
        manageSubscription: builder.mutation({
            query: ({subscriptionId}:{subscriptionId:string}) => ({
                url: `/api/account/subscription/${subscriptionId}/manage`,
                method: 'POST',
            })
        }),cancelSubscription: builder.mutation({
            query: ({subscriptionId}:{subscriptionId:string}) => ({
                url: `/api/account/subscription/${subscriptionId}/cancel`,
                method: 'POST',
            })
        }),
})

})
export const {useCancelSubscriptionMutation,useManageSubscriptionMutation,useGetSubscriptionBySubscriptionIdQuery,useAccountMutation,usePostSessionMutation,useLogoutMutation,useVerifyEmailMutation} = AccountQuery
