import db from "@/db"
import { Assessments, Candidates, SelectCandidates } from "@/db/schema/schema"
import { and, eq } from "drizzle-orm";
import { v4 as uuidv4, } from 'uuid';

export const createCandidate = async ({fullName,email,versionId}:{fullName:string,email:string,versionId:number}) => {
    try {
        
        const candidate = await db.insert(Candidates).values({
            versionId,
            email,
            generatedUrl:uuidv4(),
            currentStep:'sign',
            fullName  ,
        
            
        }).returning({ insertId: Candidates.id,
         })
        
        

        return await db.select().from(Candidates).where(eq(Candidates.id,candidate[0].insertId)).then((data) => data[0].generatedUrl)
 
    } catch (error:any) {
        throw new Error(error.message)
    }
}
export const redirectByCandidateStep =  ({
    candidate,
    uniqueId,
    currentPage,
  }: {
    candidate: SelectCandidates;
    uniqueId: string;
    currentPage: string;
  }) => {
    const candidateUrl = '/candidate/' + uniqueId + '/' + candidate.generatedUrl;
  console.log(candidate,currentPage);
  
    // Check if the current page does not match the candidate's current step
    if (currentPage !== candidate.currentStep) {
      if (candidate.currentStep === 'intro') {
        return { redirect: true, url: candidateUrl + '/intro' };
      } else if (candidate.currentStep === 'sign') {
        return { redirect: true, url: candidateUrl + '/sign' };
      }else if (candidate.currentStep === 'questions') {
        return { redirect: true, url: candidateUrl + '/questions' };
      }
       else if (candidate.currentStep === 'test') {
        return { redirect: true, url: candidateUrl + '/tests' };
      } else if (candidate.currentStep === 'finished') {
        return { redirect: true, url: candidateUrl + '/success' };
      }
    }
  
    // If no redirection is needed, return null or an appropriate response
    return { redirect: false };
  };
  export const getCandidateFromCandidateUniqueIdAndUniqueId = async (candidateUniqueId:string,uniqueId:string)=>{
   const candidate = await db.select().from(Candidates).where(and(eq(Candidates.generatedUrl,candidateUniqueId),eq(Candidates.generatedUrl,candidateUniqueId))).then((data) => data[0])
   console.log(candidate);
     
   return candidate
  }