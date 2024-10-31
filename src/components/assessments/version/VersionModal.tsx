import { Button, SelectItem, Select } from "@nextui-org/react";
import { TbDotsVertical } from "react-icons/tb";
import {SelectVersions} from "@/db/schema/schema";

export const VersionModal = ({version,versionId}:{version:SelectVersions[],versionId:number}) => {
    console.log(version)

    const getStatusClass = (key: number) => {
        const selectedVersion = version?.find(item => item.id === key);
        return selectedVersion?.isPublished === true ? "bg-success-500" : "bg-red-500";
    };

    return (
        <div>
            <Select  defaultSelectedKeys={[versionId.toString()]}  endContent={
                <div className={`${getStatusClass(versionId)}  p-2 w-2 h-2 rounded-full`}/>
            } className='min-w-[200px]'>
                {version.map((item) => (
                    <SelectItem key={item.id} value={item.name} endContent={<div className={`${getStatusClass(item.id)}  p-2 w-2 h-2 rounded-full`}/>}>
                        {item.name}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
};
