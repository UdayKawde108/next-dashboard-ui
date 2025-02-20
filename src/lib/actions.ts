"use server";

import { revalidatePath } from "next/cache";
import { AreaSchema, SmasterSchema } from "./formValidationSchemas";
import prisma from "./prisma";

//jay shri sita ram om hariharay namah om aniruddhaya namaha


type CurrentState={success:boolean;error:boolean};
export const createArea=async(CurrentState:CurrentState,
  data:AreaSchema)=>{
  
  try{
    await prisma.area.create({
      data:{
        name:data.areaname,
        smasters:{
          connect:data.smasters.map((smasterId)=>({id:smasterId})),
        },
        tasks: {
          connect: data.tasks.map((taskId) => ({ id: Number(taskId) })), // Added tasks
        },
      },
    });

    //revalidatePath("/list/areas");
    return{success:true,error:false};
  }catch(err){
    console.log(err)
    return{success:false,error:true}
  }
}

export const updateArea = async (CurrentState: CurrentState, data: AreaSchema) => {
  try {
    await prisma.area.update({
      where: {
        id: data.id
      },
      data: {
        name: data.areaname,
        smasters: {
          // Instead of set, use connect to keep existing relations
          connect: data.smasters.map((smasterId) => ({ id: smasterId }))
        },
        tasks: {
          // Connect only new tasks, avoid resetting
          connect: data.tasks.map((taskId) => ({ id: Number(taskId) }))
        }
      }
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};



export const deleteArea = async (CurrentState: CurrentState, data: FormData) => {
  const id = parseInt(data.get("id") as string);

  try {
    // ✅ Step 1: Disconnect all Smaster from Area
    await prisma.area.update({
      where: { id },
      data: { smasters: { set: [] } }, // Disconnects Smaster relations
    });

    // ✅ Step 2: Disconnect all Tasks from Area
    await prisma.area.update({
      where: { id },
      data: { tasks: { set: [] } }, // Disconnects Task relations
    });

    // ✅ Step 3: Delete the Area
    await prisma.area.delete({
      where: { id },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};


//

export const createSmaster = async (
  currentState: CurrentState,
  data: SmasterSchema
) => {
  try {
    await prisma.smaster.create({
      data,
    });

    // revalidatePath("/list/smaster");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateSmaster = async (
  currentState: CurrentState,
  data: SmasterSchema
) => {
  try {
    await prisma.smaster.update({
      where: {
        id: data.id,
      },
      data,
    });

    // revalidatePath("/list/class");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteSmaster = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.smaster.delete({
      where: {
        id: parseInt(id),
      },
    });

    // revalidatePath("/list/class");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};



{/*import { AreaSchema } from "./formValidationSchemas";
import prisma from "./prisma";

export const createArea = async (data: AreaSchema) => {
  try {
    const newArea = await prisma.area.create({
      data: {
        name: data.name,
        smasters: {
          connect: data.smasters.map((smasterId) => ({ id: smasterId })),
        },
      },
    });

    console.log("Area created:", newArea);  // Log the created area
    return { success: true, error: false };
  } catch (err) {
    console.log("Error creating area:", err);  // Log any errors that occur
    return { success: false, error: true };
  }
};

export const updateArea = async (data: AreaSchema) => {
  try {
    const updatedArea = await prisma.area.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        smasters: {
          set: data.smasters.map((smasterId) => ({ id: smasterId })),
        },
      },
    });

    console.log("Area updated:", updatedArea);  // Log the updated area
    return { success: true, error: false };
  } catch (err) {
    console.log("Error updating area:", err);  // Log any errors that occur
    return { success: false, error: true };
  }
};

*/}