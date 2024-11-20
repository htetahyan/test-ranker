import { Button, SelectItem, Select } from "@nextui-org/react";
import { TbDotsVertical } from "react-icons/tb";
import {SelectVersions} from "@/db/schema/schema";
import { useRouter } from "next/navigation";

export const VersionModal = ({version,versionId}:{version:SelectVersions[],versionId:number}) => {
 

    const getStatusClass = (key: number) => {
        const selectedVersion = version?.find(item => item.id === key);
        return selectedVersion?.isPublished === true ? "bg-success-500" : "bg-red-500";
    };
const router=useRouter()
const currentVersion=version?.find(item => item.id === versionId);
const goToAnotherVersion=(id:number)=>{router.push(`/assessments/${currentVersion?.assessmentId}/${id}`)}
    return (
        <div>
            <Select  defaultSelectedKeys={[versionId.toString()]}  endContent={
                <div className={`${getStatusClass(versionId)}  p-2 w-2 h-2 rounded-full`}/>
            } className='min-w-[200px]'>
                {version.map((item) => (
                    <SelectItem key={item.id} onClick={()=>goToAnotherVersion(item.id)}  value={item.name} endContent={<div className={`${getStatusClass(item.id)}  p-2 w-2 h-2 rounded-full`}/>}>
                        {item.name}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
};
