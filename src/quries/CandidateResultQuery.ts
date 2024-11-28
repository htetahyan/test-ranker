import baseApi from "./BaseQuery";

const CandidateResultQuery = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getCandidateInfo: builder.query({
            query: (candidateId) => ({
                url: `/api/candidate-results/${candidateId}/info`,
                method: "GET",
            }),
        }),
        getCandidateTestsAndAnswers: builder.query({
            query: (candidateId) => ({
                url: `/api/candidate-results/${candidateId}/tests`,
                method: "GET",
            }),
        }),
        getCandidateQuestionsAndAnswers: builder.query({
            query: ({candidateId}: { candidateId: number }) => ({
                url: `/api/candidate-results/${candidateId}/questions`,
                method: "GET",
            }),

        }),
        deleteCandidateAndResults: builder.mutation({
            query: (candidateId) => ({
                url: `/api/candidate-results/${candidateId}/delete`,
                method: "DELETE",
            }),
        }),
        getCandidateResults: builder.query({
            query: ({candidateId,versionId}) => ({
                url: `/api/candidate-results/${candidateId}/results`,
                method: "GET",
                params:{versionId}
            }),
        }),
    }),
})
export default CandidateResultQuery
export const {useDeleteCandidateAndResultsMutation,useGetCandidateInfoQuery,useGetCandidateResultsQuery,useGetCandidateTestsAndAnswersQuery,useGetCandidateQuestionsAndAnswersQuery} = CandidateResultQuery