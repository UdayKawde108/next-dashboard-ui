import prisma from "@/lib/prisma";
import AttendanceChart from "./AttendanceChart";
import Image from 'next/image';

const AttendanceChartContainer = async () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const lastMonday = new Date();
lastMonday.setUTCDate(today.getUTCDate() - daysSinceMonday);
lastMonday.setUTCHours(0, 0, 0, 0);
    // Fetch attendance data
    const resData = await prisma.attendance.findMany({
        where: {
            date: {
                gte: lastMonday,
            }
        },
        select: {
            date: true,
            present: true,
        }
    });
    //console.log("Fetched Attendance Data:", resData);

    // Initialize attendance map
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const attendanceMap: { [key: string]: { present: number; absent: number } } = {
        Mon: { present: 0, absent: 0 },
        Tue: { present: 0, absent: 0 },
        Wed: { present: 0, absent: 0 },
        Thu: { present: 0, absent: 0 },
        Fri: { present: 0, absent: 0 },
        Sat: { present: 0, absent: 0 },
        Sun: { present: 0, absent: 0 },
    };

    // Process fetched data
    
    for (const item of resData) {
        const itemDate = new Date(item.date);
        const dayName = daysOfWeek[itemDate.getDay() - 1]; // Get correct day name

        if (dayName in attendanceMap) {
            if (item.present) {
                attendanceMap[dayName].present += 1;
            } else {
                attendanceMap[dayName].absent += 1;
            }
        }
    }
    const data=daysOfWeek.map((day)=>({
        name:day,
        present:attendanceMap[day].present,
        absent:attendanceMap[day].absent,
    }))

    
    console.log("Processed Attendance Data:", attendanceMap);

    return (
        <div className='bg-white rounded-lg p-4 h-full'>
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'>Attendance</h1>
                <Image src="/moreDark.png" alt="" width={20} height={20} />
            </div>
            <AttendanceChart data={data}/>
        </div>
    );
};

export default AttendanceChartContainer;
