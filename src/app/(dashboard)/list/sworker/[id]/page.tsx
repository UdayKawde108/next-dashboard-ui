
import Announcement from '@/components/Announcement';
import Performance from '@/components/Performance';
import BigCalender from '@/components/BigCalendar';
import Image from 'next/image';
import Link from 'next/link';
import { any } from 'zod';

const SworkerSinglePage = () => {
  return (
    <div className='flex-1 p-4 flex flex-col gap-4 xl:flex-row'>
        {/* LEFT */}
        
        <div className="w-full xl:w-2/3">
        
        {/*TOP*/}

        <div className="flex flex-col lg:flex-row gap-4">
            {/* USER INFO CARD*/}
            <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
                <div className="w-1/3">
                <Image src="https://images.pexels.com/photos/5414817/pexels-photo-5414817.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="" width={144} height={144} 
                className="w-36 h-36 rounded-full object-cover"/>
                </div>
                <div className='w-2/3 flex flex-col justify-between gap-4'>
                <h1 className='text-xl font-semibold'>Asmita P</h1>
                <p className='text-sm text-gray-500'>wqgduuygq qdgiidgigdqw qgwiugdigqi wsgigdq iuqiuwdgigqd
                </p>
                <div className='flex items-center justify-between gap-2 flex-wrap text-xs font-medium'>
                    <div className='w-full md:w-1/3 lg:w-full flex items-center gap-2'>
                        <Image src='/blood.png' alt='' width={14} height={14}/>
                        <span>A+</span>
                    </div>

                    <div className='w-full md:w-1/3 flex items-center gap-2'>
                        <Image src='/date.png' alt='' width={14} height={14}/>
                        <span>Jan 2025</span>
                    </div>

                    <div className='w-full md:w-1/3 flex items-center gap-2'>
                        <Image src='/mail.png' alt='' width={14} height={14}/>
                        <span>user@gmail.com</span>
                    </div>

                    <div className='w-full md:w-1/3 flex items-center gap-2'>
                        <Image src='/phone.png' alt='' width={14} height={14}/>
                        <span>123456789</span>
                    </div>
                </div>
                </div>
            </div>
            {/* SMALL CARDS*/}
            <div className='flex-1 flex gap-4 justify-between flex-wrap'>
                {/* CARD */}
                <div className='bg-white p-4 rounded flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
                    <Image src="/singleAttendance.png" alt="" width={24} height={24} className='w-6 h-6'/>

                    <div className=''>
                        <h1 className='text-xl font-semibold'>90%</h1>
                        <span className='text-sm text-gray-400'>Attendance</span>
                    </div>
                </div>
                 {/* CARD */}
                 <div className='bg-white p-4 rounded flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
                    <Image src="/singleAttendance.png" alt="" width={24} height={24} className='w-6 h-6'/>

                    <div className=''>
                        <h1 className='text-xl font-semibold'>6</h1>
                        <span className='text-sm text-gray-400'>Tasks</span>
                    </div>
                </div>

                 {/* CARD */}
                 <div className='bg-white p-4 rounded flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
                    <Image src="/singleAttendance.png" alt="" width={24} height={24} className='w-6 h-6'/>

                    <div className=''>
                        <h1 className='text-xl font-semibold'>6</h1>
                        <span className='text-sm text-gray-400'>Classes</span>
                    </div>
                </div>

            </div>
        </div>
        {/* BOTTOM */}
        <div className='mt-4 bg-white rounded-md p-4 h-[800px]'>
            <h1>Sworker&apos;s Schedule</h1>
            <BigCalender/>
        </div>
        </div>
        {/*RIGHT*/}
        <div className='w-full xl:w-1/3 flex flex-col gap-4'>

        <div className="bg-white p-4 rounded-md">
            <h1 className="text-xl font-semibold">Shortcuts</h1>
            <div className='mt-4 flex gap-4 flex-wrap text-xs text-gray-500'>
                <Link className="p-3 rounded-md bg-lamaskyLight"href="/">
                Sworker&apos;s Tasks </Link>
                <Link className="p-3 rounded-md bg-lamaskyLight"href="/">
                Sworker&apos;s Smaster </Link>
            </div>
        </div>
        <Performance/>
        
        <Announcement/>
        </div>
    </div>
  )
}

export default SworkerSinglePage