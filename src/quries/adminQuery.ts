import baseApi from "./BaseQuery";

export const adminQuery = baseApi.injectEndpoints({
    overrideExisting: true,

    endpoints: (build) => ({
        createNewCustomTest: build.mutation({
            query: (body) => ({
                url: '/api/test/custom',
                method: 'POST',
                body: JSON.stringify(body)
            })
        }),
        addNewMultipleChoiceAndOptions: build.mutation({
            query: (body) => ({
                url: '/api/multiple-choice/new',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body
            })
        })
    }),
})
export default adminQuery
export const {useCreateNewCustomTestMutation,useAddNewMultipleChoiceAndOptionsMutation} = adminQuery