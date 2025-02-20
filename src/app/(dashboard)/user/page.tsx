import Announcement from "@/components/Announcement"
import BigCalender from "@/components/BigCalendar"
import EventCalendar from "@/components/EventCalendar"

const UserPage = () => {
  return (
    <div className='p-4 flex gap-4 flex-col xl:flex-row'>

      {/* LEFT*/}
      <div className="flex-1 w-full xl:w-2/3">
      
      <div className="h-full bg-white p-4 rounded-md">
        <h1 className="text-xl font-semibold">Schedule (John Doe)</h1>
        <BigCalender/>
      </div>
      </div>

      {/*RIGHT */}
      
      
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
      
      
      <Announcement/>
      </div>
      
    </div>
  )
}

export default UserPage;