import db from "@/db"
import { Tests } from "@/db/schema/schema"

export const createTest=async()=>{
const test=await db.insert(Tests).values({
    title:"Test 1",
    description:"Test 1 description",
    companyId:1,
    createdAt:new Date(),
    updatedAt:new Date()
})

}