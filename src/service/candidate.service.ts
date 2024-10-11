import db from "@/db"
import { Candidates } from "@/db/schema/schema"
import { eq } from "drizzle-orm";
import { v4 as uuidv4, } from 'uuid';

export const createCandidate = async ({fullName,email,assessmentId}:{fullName:string,email:string,assessmentId:number}) => {
    try {
        
        const candidate = await db.insert(Candidates).values({
            assessmentId,
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