import { auth } from "@clerk/nextjs/server";

export const role = async (): Promise<string | undefined> => {
  const { sessionClaims } = await auth();
  return (sessionClaims?.metadata as { role?: string })?.role;
};

export const adjustScheduleToCurrentWeek = (
  tasks: { title: string; start: Date; end: Date }[]
): { title: string; start: Date; end: Date }[] => {
  return tasks.map((task) => {
    const now = new Date();
    if (task.start > now) {
      // If task is in the future, keep it unchanged
      return task;
    }

    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const latestMonday = new Date();
    latestMonday.setDate(today.getDate() - daysSinceMonday); // Get this week's Monday

    const taskDayOfWeek = task.start.getDay(); // Find original event day
    const adjustedStartDate = new Date(latestMonday);
    adjustedStartDate.setDate(latestMonday.getDate() + taskDayOfWeek); // Move task to correct weekday
    adjustedStartDate.setHours(
      task.start.getHours(),
      task.start.getMinutes(),
      task.start.getSeconds()
    );

    const adjustedEndDate = new Date(adjustedStartDate);
    adjustedEndDate.setHours(
      task.end.getHours(),
      task.end.getMinutes(),
      task.end.getSeconds()
    );

    return {
      title: task.title,
      start: adjustedStartDate,
      end: adjustedEndDate,
    };
  });
};


