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
})

})
export const {useAccountMutation,usePostSessionMutation} = AccountQuery
