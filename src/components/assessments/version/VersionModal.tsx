import { Button, SelectItem, Select } from "@nextui-org/react";
import { TbDotsVertical } from "react-icons/tb";

export const VersionModal = () => {
    const version = [
        {
            key: "1",
            name: "1.0.0",
            status: "active",
        },
        {
            key: "2",
            name: "1.0.1",
            status: "inactive",
        },
    ];

    const getStatusClass = (key: string) => {
        const selectedVersion = version.find(item => item.key === key);
        return selectedVersion?.status === "active" ? "bg-success-500" : "bg-red-500";
    };

    return (
        <div>
            <Select defaultSelectedKeys={["1"]}  endContent={
                <div className={`${getStatusClass("1")}  p-2 w-2 h-2 rounded-full`}/>
            } className='min-w-[200px]'>
                {version.map((item) => (
                    <SelectItem key={item.key} value={item.key} endContent={<div className={`${getStatusClass(item.key)}  p-2 w-2 h-2 rounded-full`}/>}>
                        {item.name}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
};
