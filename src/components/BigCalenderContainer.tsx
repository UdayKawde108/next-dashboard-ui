import prisma from "@/lib/prisma";
import BigCalender from "./BigCalendar";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

const BigCalenderContainer = async({ type, id }: { type: "smasterId" | "areaId"; id: string | number }) => {
    const dataRes = await prisma.task.findMany({
        where: {
            ...(type === "smasterId"
                ? { smasterId: id as string }
                : { areaId: id as number }
            ),
        },
        include: {
            area: true, // Include area details
        },
    });

    const data = dataRes.map(task => ({
        title: `${task.name} (${task.area?.name || "No Area"})`,
        start: new Date(task.startTime), // Convert to JS Date
        end: new Date(task.endTime)
      }));

    const schedule = adjustScheduleToCurrentWeek(data);

    return (
        <div className=''>
            <BigCalender data={schedule} />
        </div>
    );
};

export default BigCalenderContainer;
