import db from '@/db';
import { Tests } from '@/db/schema/schema';
import { desc, eq } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';
export const getCustomTests =unstable_cache(async () => {
    return await db.select().from(Tests).where(eq(Tests.testType,'custom')).orderBy(desc(Tests.createdAt))
},['CUSTOM_TESTS'],{tags:['CUSTOM_TESTS'],revalidate:60})
