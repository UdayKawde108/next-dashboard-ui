import prisma from "@/lib/prisma";
import FormModal from "./FormModal";

export type FormContainerProps={table:"smaster" | "sworker" | "users" |"announcement"|"area"|"task";
    type:"create"|"update"|"delete";
    data?:any;
    id?:number | string;
}
const FormContainer = async({table,type,data,id}:FormContainerProps) => {

    let relatedData={};
    if(type!=="delete"){
        switch(table){
            case "area":
                const areaSmasters = await prisma.smaster.findMany({ select: { id: true, name: true, surname: true } });
                const areaTasks = await prisma.task.findMany({ select: { id: true, name: true } }); // Fetch tasks
                relatedData = { smasters: areaSmasters, tasks: areaTasks };
                break;
            case "smaster":
                    const smasterAreas = await prisma.area.findMany({
                      select: { id: true, name: true },
                    });
                    relatedData = { subjects: smasterAreas };
                    break;
                default:break;
        }
    }
  return (
    <div className=''><FormModal table={table} type={type} data={data} id={id} relatedData={relatedData}/></div>
  )
}

export default FormContainer