import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RiOrderPlayFill } from "react-icons/ri";

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
    tagTypes: ["QUESTION", "TEST", "CANDIDATE","CUSTOM_TEST"],
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
            }), invalidatesTags:['TEST']
           
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
        getQuestionsFromVersionId: builder.query({
            query: ({versionId}) => ({
                url: `/api/questions/${versionId}`,
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
            query: ({id,versionId}) => ({
                url: `/api/test/${id}/${versionId}`,
                method: 'GET',
            }),
            providesTags:(result,error,arg)=>error?['TEST']:[...result?.data?.multipleChoiceQuestions.map(({question,options}:any)=>({type:'TEST',id:question.id})),{type:'TEST',id:'LIST'}],
            
          
        })   ,
        orderTests:builder.mutation({
            query:(body)=>({
                url:`/api/multiple-choice/order`,
                method:'POST',
                body:JSON.stringify(body)
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
        query:({id,questionsCount,prompt,versionId}:{id:number,questionsCount:number,prompt:string,versionId:number})=>({
            url:`/api/test/${id}/${versionId}/generate`,
            method:'POST',
            body:JSON.stringify({questionsCount,prompt})
        }),invalidatesTags:['TEST']
    }),
    editAssessment:builder.mutation({
        query:({name,assessmentId,jobRole}:{name:string,assessmentId:number,jobRole:string})=>({
            url:`/api/assessments/${assessmentId}/edit`,
            method:'PUT',
            body:JSON.stringify({name,jobRole})
        })
    }),
    addCustomTestToAssessment:builder.mutation({
        query:(body)=>({
            url:`/api/custom-tests`,
            method:'PUT',
            body
        }),invalidatesTags:( result,error,arg)=> error?['CUSTOM_TEST']:[{type:'CUSTOM_TEST',id:arg.customTestId}]
    }),
    isCustomTestAdded:builder.query({
        query:({customTestId,versionId}:{customTestId:number,versionId:number})=>({
            url:`/api/custom-tests`,
            method:'GET',
            params:{customTestId,versionId}

        }),providesTags:(result,error,args)=> error?['CUSTOM_TEST']:[{type:'CUSTOM_TEST',id:args.customTestId}]
    }),
TogglePublish:builder.mutation({
    query:({assessmentId,versionId,type}:{assessmentId:number,versionId:number,type:string})=>({
        url:`/api/assessments/${assessmentId}/${versionId}`,
        method:'POST'
        ,body:JSON.stringify({type})
    })
}),CloneVersion:builder.mutation({
    query:({assessmentId,versionId}:{assessmentId:number,versionId:number})=>({
        url:`/api/assessments/${assessmentId}/${versionId}/clone`,
        method:'POST'
        
    })
})   })
})
export const {useCloneVersionMutation,useTogglePublishMutation,useIsCustomTestAddedQuery,useAddCustomTestToAssessmentMutation,useEditAssessmentMutation,useGenerateMoreTestMutation,useDeleteMutipleChoiceQuestionMutation,useGetMultipleChoiceAndOptionsQuery,useDeleteQuestionByIdMutation,useOrderTestsMutation,  useCreateNewAssessmentMutation ,useGenerateTestMutation, useEditMultipleChoiceQuestionMutation,useCreateNewQuestionMutation,useGetQuestionsFromVersionIdQuery } = baseApi
export default baseApi
