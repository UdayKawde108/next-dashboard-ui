import Announcement from "@/components/Announcement";
import BigCalenderContainer from "@/components/BigCalenderContainer";
import EventCalendar from "@/components/EventCalendar";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const Sworker = async () => {
  const { userId } = await auth(); // Get logged-in user ID

  // Fetch tasks assigned to the Sworker
  const tasks = await prisma.task.findMany({
    where: { sworkers: { some: { id: userId! } } },
    include: { area: true, smaster: true },
  });

  console.log(tasks);

  

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule</h1>
          {tasks.length > 0 ? (
            <BigCalenderContainer type="areaId" id={tasks[0].areaId} />
          ) : (
            <p className="text-gray-500">No tasks assigned yet.</p>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcement />
      </div>
    </div>
  );
};

export default Sworker;
