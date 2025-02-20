
import Announcement from "@/components/Announcement"
import AttendanceChart from "@/components/AttendanceChart"
import AttendanceChartContainer from "@/components/AttendanceChartContainer"
import CountChart from "@/components/CountChart"
import CountChartContainer from "@/components/CountChartContainer"
import EventCalendar from "@/components/EventCalendar"
import EventCalendarContainer from "@/components/EventCalendarContainer"
import FinanceChart from "@/components/FinanceChart"
import UserCard from "@/components/UserCard"
import { useSearchParams } from "next/navigation"

const AdminPage = ({searchParams,}:{searchParams:{[keys:string]:string|undefined}}) => {
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row'>
      
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
      
      {/* USER CARDS */}

      <div className="flex gap-4 justify-between">

        <UserCard type="smaster"/>
        <UserCard type="sworker"/>
        <UserCard type="user"/>
        <UserCard type="admin"/>
        
      </div>
      {/* MiddleCharts*/}
      <div className="flex gap-4 flex-col lg:flex-row">
        {/*COUNT CHART*/}
        <div className="w-full lg:w-1/3 h-[450px]">
        <CountChartContainer/>
        </div>
        {/*ATTENDANCE CHAT*/}
        <div className="w-full lg:w-2/3 h-[450px]">
        <AttendanceChartContainer/>
        </div>
      </div>
      {/* BOTTOM CHART*/}
      <div className="w-full h-[500px]">
        <FinanceChart/>
      </div>
      </div>
      {/* RIGHT */}
      
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
      
      <EventCalendarContainer searchParams={searchParams}/>
      <Announcement/>
      </div>


    </div>
  )
}

export default AdminPage