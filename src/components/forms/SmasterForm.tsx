
/*Datta*/

"use client";
import Image from 'next/image';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect } from 'react';
import { smasterSchema, SmasterSchema } from '@/lib/formValidationSchemas';
import { useFormState } from 'react-dom';
import { createSmaster, updateSmaster } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const SmasterForm = ({type,data,setOpen,relatedData}:{type:"create"|"update";data?:any;setOpen:Dispatch<SetStateAction<boolean>>;relatedData?:any}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<SmasterSchema>({
        resolver: zodResolver(smasterSchema),
      });

      const [state, formAction] = useFormState(type === "create" ? createSmaster : updateSmaster, {
        success: false,
        error: false,
      });
    
      const onSubmit = handleSubmit((data) => {
        formAction(data);
      });
    
      const router = useRouter();
    
      useEffect(() => {
        if (state.success) {
          toast(`Smaster has been ${type === "create" ? "created" : "updated"}!`);
          setOpen(false);
          router.refresh();
        }
      }, [state]);

      const areas = relatedData?.areas || [];
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>

        <h1 className="text-xl font-semibold">{type==="create"?"Create a new Smaster":"Update anew Smaster"}</h1>
        <span className="text-xs text-gray-400 font-medium">authentication Information</span>
       
       <div className="flex justify-between flex-wrap gap-4">
        
        

        <InputField label="Username" name="username" defaultValue={data?.username} register={register}
        error={errors.username}/>

<InputField label="Email" name="email" type="email" defaultValue={data?.email} register={register}
        error={errors.email}/>

<InputField label="Password" name="password" type="password" defaultValue={data?.password} register={register}
        error={errors.password}/>

<InputField label="Firstname" name="name" type="name" defaultValue={data?.name} register={register}
        error={errors.name}/>

<InputField label="Lastname" name="surname" type="surname" defaultValue={data?.surname} register={register}
        error={errors.surname}/>

<InputField label="Phone" name="phone" type="phone" defaultValue={data?.phone} register={register}
        error={errors.phone}/>

<InputField label="Address" name="address" type="address" defaultValue={data?.address} register={register}
        error={errors.address}/>

<InputField label="DateOfBirth" name="dateofbirth" type="dateofbirth" defaultValue={data?.dateofbirth} register={register}
        error={errors.birthday}/>

</div>
        
        

        <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500">Sex</label>
        
        <select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm" {...register("sex")} defaultValue={data?.sex}>

        <option value="male">Male</option>
        <option value="female">Female</option></select>

        
        {errors.sex?.message && (<p className="text-xs text-red-400">{errors.sex.message.toString()}</p>)}</div>

        <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500">Area</label>
        
        <select multiple className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm" {...register("areas")} defaultValue={data?.areas}>



        {areas.map((area:{id:number;name:string})=>(
                <option value={area.id} key={area.id}>{area.name}</option>
        ))}
        </select>

        
        {errors.areas?.message && (<p className="text-xs text-red-400">{errors.areas.message.toString()}</p>)}</div>


        <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" htmlFor="img"><Image src="/upload.png" alt="" width={28} height={28}/><span>Upload a photo</span></label>
        
        
        <input type="file"  id="img"{...register("img")} className="hidden"/>
        
        
        
        {errors.img?.message && (<p className="text-xs text-red-400">{errors.img.message.toString()}</p>)}</div>
        
        <span className="text-xs text-gray-400 font-medium">Personal Information</span>
        <button className="bg-blue-400 text-white p-2 rounded-md">

            {type==="create"?"Create":"Update"}
        </button>
    </form>
  )
}

export default SmasterForm