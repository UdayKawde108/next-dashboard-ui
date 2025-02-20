import { z } from "zod";

export const areaSchema = z.object({
  id:z.coerce.number().optional(),
  areaname: z.string().min(1, { message: "Area name is required!" }),
  smasters:z.array(z.string()),
  tasks: z.array(z.string()),
});

export type AreaSchema = z.infer<typeof areaSchema>;

export const smasterSchema = z.object({
  id:z.string().optional(),
    username: z.string()
    .min(3,{message:"Username must be a least 3 character long!"})
    .max(20,{message:"Username must be at most 20 characters long!"}),
    email:z.string().email({message:"Invalid email address!"}).optional().or(z.literal("")),

    password:z.string().min(8,{message:"password must be at least 8 characters long!"}),
    name:z.string().min(1,{message:"First name is required!"}),
    surname:z.string().min(1,{message:"last name is required!"}),
    phone:z.string().optional(),
    address:z.string().optional(),
    birthday:z.coerce.date({message:"Birthday is required!"}),
    sex: z.enum(["MALE","FEMALE"],{message:"sex is required!"}),
    img:z.string().optional(),
    areas:z.array(z.string()).optional(),
  });
  
  export type SmasterSchema = z.infer<typeof smasterSchema>;
