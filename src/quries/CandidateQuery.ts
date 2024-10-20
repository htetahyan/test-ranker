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
        }),
        answerMultipleChoice: builder.mutation({
            query: (body) => ({
                url: '/api/candidate/multiple-choice',
                method: 'POST',
                body:JSON.stringify(body)
            })
        }),
        answerQuestion: builder.mutation({
            query: ({candidateUniqueId,answer,questionId,file}:{candidateUniqueId:string,answer:string,questionId:number ,file:File | null}) => {
              const form= new FormData();
              form.append('candidateUniqueId',candidateUniqueId);
              form.append('answer',answer);
              file && form.append('file',file);
              form.append('questionId',questionId.toString());

              return{
                url: '/api/candidate/question',
                
                 
                method: 'POST',
            
                body:form,
                
            }}
        }),
        uploadInfo: builder.mutation({

            query: ({ formData }: { formData: FormData }) => {
              // Serialize form values to JSON
        
          
              return {
                method: 'POST',
                url: '/api/candidate/info',
                
                body:  formData, // Send the payload
              };
            },
          })
          
    })
})
export const {useCreateNewCandidateMutation,useSignCandidateMutation,useAnswerMultipleChoiceMutation,useAnswerQuestionMutation
    ,useUploadInfoMutation
} = CandidateQuery
export default CandidateQuery