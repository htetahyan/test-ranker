import baseApi from "./BaseQuery";

const CandidateQuery=baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createNewCandidate: builder.mutation({
            query: (body) => ({
                url: '/api/candidate/new',
                method: 'POST',
                body:JSON.stringify(body)
            })
        }),
        signCandidate: builder.mutation({
            query: (body) => ({
                url: '/api/candidate/sign',
                method: 'POST',
                body:JSON.stringify(body)
            })
        })
    })
})
export const {useCreateNewCandidateMutation,useSignCandidateMutation} = CandidateQuery