import Sign from '@/components/candidate/Sign';
import db from '@/db';
import { Candidates } from '@/db/schema/schema';
import { Input } from '@nextui-org/react';
import { eq } from 'drizzle-orm';
import React from 'react';


const HonestyAgreementPage = async({params}:{params:{uniqueId:string,candidate_uniqueId:string}}) => {
  const candidate = await db.select().from(Candidates).where(eq(Candidates.generatedUrl, params.candidate_uniqueId)).then((data) => data[0]);
  if(!candidate) <>wrong link</>
 

  return (
    <div className="container mx-auto px-4 py-8">
   <Sign candidate={candidate} uniqueId={params.uniqueId}/>
    </div>
  );
};

export default HonestyAgreementPage;
