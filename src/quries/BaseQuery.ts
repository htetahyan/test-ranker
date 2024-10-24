import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RiOrderPlayFill } from "react-icons/ri";

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
    tagTypes: ["QUESTION", "TEST", "CANDIDATE"],
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
            providesTags:(result,error,arg)=>error?['TEST']:[...result?.data?.multipleChoiceQuestions.map(({question,options}:any)=>({type:'TEST',id:question.id})),{type:'TEST',id:'LIST'}],
            
          
        })   ,
        orderTests:builder.mutation({
            query:(body)=>({
                url:`/api/multiple-choice/order`,
                method:'POST',
                body:JSON.stringify({list:body})
            }),
            invalidatesTags:(result,error,arg)=> arg.map(({id}:any)=>({type:'TEST',id}))
        })
    ,deleteMutipleChoiceQuestion:builder.mutation({
        query:(id)=>({
            url:`/api/multiple-choice/delete`,
            method:'DELETE',
            body:JSON.stringify({id})
            
        }),            invalidatesTags:['TEST']
    }), generateMoreTest: builder.mutation({
        query:({id,questionsCount,prompt}:{id:number,questionsCount:number,prompt:string})=>({
            url:`/api/test/${id}/generate`,
            method:'POST',
            body:JSON.stringify({questionsCount,prompt})
        }),invalidatesTags:['TEST']
    }),
    editAssessment:builder.mutation({
        query:({name,assessmentId,jobLocation,jobRole,workArrangement}:{name:string,assessmentId:number,jobLocation:string,jobRole:string,workArrangement:string})=>({
            url:`/api/assessments/${assessmentId}/edit`,
            method:'PUT',
            body:JSON.stringify({name,jobLocation,jobRole,workArrangement})
        })
    }),

    })
})
export const {useEditAssessmentMutation,useGenerateMoreTestMutation,useDeleteMutipleChoiceQuestionMutation,useGetMultipleChoiceAndOptionsQuery,useDeleteQuestionByIdMutation,useOrderTestsMutation,  useCreateNewAssessmentMutation ,useGenerateTestMutation, useEditMultipleChoiceQuestionMutation,useCreateNewQuestionMutation,useGetQuestionsFromAssessmentIdQuery } = baseApi
export default baseApi
