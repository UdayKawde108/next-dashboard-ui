import prisma from "@/lib/prisma";

const Announcement = async () => {
  // Fetch announcements from the database
  const announcements = await prisma.announcement.findMany({
    orderBy: { date: "desc" }, // Latest announcements first
  });

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div
              key={announcement.id}
              className={`${
                announcement.id % 2 === 0
                  ? "bg-lamaSkyLight"
                  : "bg-lamaPurpleLight"
              } rounded-md p-4`}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-medium">{announcement.title}</h2>
                <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                  {new Date(announcement.date).toISOString().split("T")[0]}
                </span>
              </div>
              <p className="text-sm text-gray-400">{announcement.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center mt-4">No announcements yet.</p>
        )}
      </div>
    </div>
  );
};

export default Announcement;
