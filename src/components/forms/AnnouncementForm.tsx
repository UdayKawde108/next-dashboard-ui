
/*Datta*/

"use client";
import Image from 'next/image';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Announcement from '../Announcement';
import { title } from 'process';

const schema = z.object({
    titlename: z.string()
    .min(3,{message:"Username must be a least 3 character long!"})
    .max(20,{message:"Username must be at most 20 characters long!"}),
    
    date:z.string().min(1,{message:"Birthday is required!"}),
    
  });
  
  type Inputs = z.infer<typeof schema>;
const AnnouncementForm = ({type,data}:{type:"create"|"update";data?:any;}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>({
        resolver: zodResolver(schema),
      });

      const onSubmit=handleSubmit((data)=>{console.log(data);})
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>

        <h1 className="text-xl font-semibold">Create a new b</h1>
        <span className="text-xs text-gray-400 font-medium">authentication Information</span>
       
       <div className="flex justify-between flex-wrap gap-4">
        
        

        <InputField label="Username" name="username" defaultValue={data?.title} register={register}
        error={errors.titlename}/>

<InputField label="DateOfBirth" name="dateofbirth" type="dateofbirth" defaultValue={data?.date} register={register}
        error={errors.date}/>

</div>
        
        

       
        

        
        

        
        
        <span className="text-xs text-gray-400 font-medium">Personal Information</span>
        <button className="bg-blue-400 text-white p-2 rounded-md">

            {type==="create"?"Create":"Update"}
        </button>
    </form>
  )
}

export default AnnouncementForm