import prisma from "@/lib/prisma";
import CountChart from "./CountChart";import Image from 'next/image';

const CountChartContainer = async() => {
    const data=await prisma.sworker.groupBy({by:["sex"],_count:true,});
    const Men=data.find((d)=>d.sex ==="MALE")?._count||0;
    const Women=data.find((d)=>d.sex ==="FEMALE")?._count||0;
  return (
    <div className='bg-white rounded-xl w-full h-full p-4'>
            {/* TITLE */}
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'>Sanitation Workers</h1>
                <Image src="/moreDark.png" alt="" width={20} height={20}/>
            </div>
    
            {/* CHART */}
    
            
                <CountChart Men={Men} Women={Women}/>
                
        {/* BOTTOM */}
        <div className='flex justify-center gap-16'>
            <div className='flex flex-col gap-1'>

                <div className='w-5 h-5 bg-lamaSky rounded-full'/>
                <h1 className='font-bold'>{Men}</h1>
                
                <h2 className='text-xs text-gray-300'>Men</h2>
            </div>

            <div className='flex flex-col gap-1'>

                <div className='w-5 h-5 bg-lamaYellow rounded-full'/>
                <h1 className='font-bold'>{Women}</h1>
                
                <h2 className='text-xs text-gray-300'>Women</h2>
            </div>
        </div>





    </div>
  )
}

export default CountChartContainer