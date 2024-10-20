import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
    tagTypes: ["QUESTION", "TEST"],
    reducerPath: 'baseApi',


    endpoints: (builder) => ({
        createNewAssessment: builder.mutation({
            query: (body) => ({
                url: '/api/assessments/new',
                method: 'POST',
                body:JSON.stringify(body)
            })
        }),
        generateTest: builder.mutation({
            query:(body)=>({
                url:`/api/test/generate`,
                method:'POST',
                body
            }),
           
        }),
        editMultipleChoiceQuestion: builder.mutation({
            query:(body)=>({
                url:`/api/multiple-choice/edit`,
                method:'PUT',
                body
            }),
        }),
        createNewQuestion: builder.mutation({
            query:(body)=>({
                url:`/api/questions/new`,
                method:'POST',
                body
            }),
            invalidatesTags:['QUESTION']
        })    ,
        getQuestionsFromAssessmentId: builder.query({
            query: ({assessmentId}) => ({
                url: `/api/questions/${assessmentId}`,
                method: 'GET',
            }),            providesTags: ['QUESTION']

        }),
        deleteQuestionById:builder.mutation({
            query:(id)=>({
                url:`/api/questions/${id}`,
                method:'DELETE',
                
            }),            invalidatesTags:['QUESTION']

        }),
        getMultipleChoiceAndOptions:builder.query({
            query: ({id}) => ({
                url: `/api/test/${id}`,
                method: 'GET',
            }),
          
        })    })
})
export const {useGetMultipleChoiceAndOptionsQuery,useDeleteQuestionByIdMutation,  useCreateNewAssessmentMutation ,useGenerateTestMutation, useEditMultipleChoiceQuestionMutation,useCreateNewQuestionMutation,useGetQuestionsFromAssessmentIdQuery } = baseApi
export default baseApi
