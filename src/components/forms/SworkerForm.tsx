
/*Datta*/

"use client";
import Image from 'next/image';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
    username: z.string()
    .min(3,{message:"Username must be a least 3 character long!"})
    .max(20,{message:"Username must be at most 20 characters long!"}),
    email:z.string().email({message:"Invalid email address!"}),

    password:z.string().min(8,{message:"password must be at least 8 characters long!"}),
    firstName:z.string().min(1,{message:"First name is required!"}),
    lastName:z.string().min(1,{message:"last name is required!"}),
    phone:z.string().min(1,{message:"Phone is required!"}),
    address:z.string().min(1,{message:"address iis required!"}),
    birthday:z.string().min(1,{message:"Birthday is required!"}),
    sex: z.enum(["male","female"],{message:"sex is required!"}),
    img:z.instanceof(File,{message:"Image is required"}),
  });
  
  type Inputs = z.infer<typeof schema>;
const SworkerForm = ({type,data}:{type:"create"|"update";data?:any;}) => {

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

        <h1 className="text-xl font-semibold">Create a new Sworker</h1>
        <span className="text-xs text-gray-400 font-medium">authentication Information</span>
       
       <div className="flex justify-between flex-wrap gap-4">
        
        

        <InputField label="Username" name="username" defaultValue={data?.username} register={register}
        error={errors.username}/>

<InputField label="Email" name="email" type="email" defaultValue={data?.email} register={register}
        error={errors.email}/>

<InputField label="Password" name="password" type="password" defaultValue={data?.password} register={register}
        error={errors.password}/>

<InputField label="Firstname" name="firstname" type="firstname" defaultValue={data?.firstName} register={register}
        error={errors.firstName}/>

<InputField label="Lastname" name="lastname" type="lastname" defaultValue={data?.lastName} register={register}
        error={errors.lastName}/>

<InputField label="Phone" name="phone" type="phone" defaultValue={data?.phone} register={register}
        error={errors.phone}/>

<InputField label="Address" name="address" type="address" defaultValue={data?.address} register={register}
        error={errors.address}/>

<InputField label="DateOfBirth" name="dateofbirth" type="dateofbirth" defaultValue={data?.dateofbirth} register={register}
        error={errors.birthday}/>

<InputField label="Sex" name="sex" defaultValue={data?.sex} register={register}
        error={errors.sex}/></div>
        
        

        <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500">Sex</label>
        
        <select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm" {...register("sex")} defaultValue={data?.sex}>

        <option value="male">Male</option>
        <option value="female">Female</option></select>

        
        {errors.sex?.message && (<p className="text-xs text-red-400">{errors.sex.message.toString()}</p>)}</div>

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

export default SworkerForm