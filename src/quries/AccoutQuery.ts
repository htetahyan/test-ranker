import baseApi from "./BaseQuery";

export const AccountQuery=baseApi.injectEndpoints({

    endpoints: (builder) => ({
        account: builder.mutation({
            query: (body) => ({
                url: '/api/account',
                method: 'POST',
                body:JSON.stringify(body)
            })
        })
})

})
export const {useAccountMutation} = AccountQuery
