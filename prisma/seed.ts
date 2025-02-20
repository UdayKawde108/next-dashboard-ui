import { Day, PrismaClient, UserSex } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Clearing existing data...");

  // **Clear existing data (order matters to prevent foreign key issues)**
  await prisma.attendance.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.sworker.deleteMany();
  await prisma.task.deleteMany();
  await prisma.smaster.deleteMany();
  await prisma.user.deleteMany();
  await prisma.area.deleteMany();
  await prisma.admin.deleteMany();

  console.log("Seeding Admins...");
  // **ADMIN**
  const admins = ["admin1", "admin2"];
  for (const id of admins) {
    await prisma.admin.upsert({
      where: { id },
      update: {},
      create: { id, username: id },
    });
  }

  console.log("Seeding Areas...");
  // **AREAS (Fixed with upsert)**
  const areaData = [
    { name: "Dombivli" },
    { name: "Kalyan" },
    { name: "Kopar" },
    { name: "Thane" },
    { name: "Kalwa" },
    { name: "Diva" },
    { name: "Mulund" },
  ];

  const areas = await Promise.all(
    areaData.map((area) =>
      prisma.area.upsert({
        where: { name: area.name },
        update: {},
        create: area,
      })
    )
  );

  console.log("Seeding Smaster...");
  // **SMASTERS**
  for (let i = 1; i <= 15; i++) {
    await prisma.smaster.upsert({
      where: { id: `smaster${i}` },
      update: {},
      create: {
        id: `smaster${i}`,
        username: `smaster${i}`,
        name: `TName${i}`,
        surname: `TSurname${i}`,
        email: `teacher${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
       // areas: { connect: areas.map((area) => ({ id: area.id })) },
      },
    });
  }

  console.log("Seeding Tasks...");
  // **TASKS**
  for (let i = 1; i <= 30; i++) {
    await prisma.task.create({
      data: {
        name: `task${i}`,
        day: Day[Object.keys(Day)[Math.floor(Math.random() * Object.keys(Day).length)] as keyof typeof Day],
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 3)),
        areaId: areas[i % areas.length].id,
        smasterId: `smaster${(i % 15) + 1}`,
      },
    });
  }

  console.log("Seeding Users...");
  // **USERS**
  for (let i = 1; i <= 25; i++) {
    await prisma.user.upsert({
      where: { id: `userId${i}` },
      update: {},
      create: {
        id: `userId${i}`,
        username: `userId${i}`,
        name: `PName ${i}`,
        surname: `PSurname ${i}`,
        email: `user${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
        sex: UserSex.MALE,
      },
    });
  }

  console.log("Seeding Sworkers...");
  // **SWORKERS**
  for (let i = 1; i <= 50; i++) {
    await prisma.sworker.upsert({
      where: { id: `sworker${i}` },
      update: {},
      create: {
        id: `sworker${i}`,
        username: `sworker${i}`,
        name: `SName${i}`,
        surname: `SSurname${i}`,
        email: `sworker${i}@example.com`,
        phone: `987-654-321${i}`,
        address: `Address${i}`,
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        user: { connect: { id: `userId${(i % 25) + 1}` } },
        smasters: { connect: [{ id: `smaster${(i % 15) + 1}` }] },
      },
    });
  }

  console.log("Seeding Attendance...");
  // **ATTENDANCE**
  for (let i = 1; i <= 10; i++) {
    await prisma.attendance.create({
      data: {
        date: new Date(),
        time: "10:00 AM", // Sample time
        class: "Morning", // Sample class
        mobile: `98765432${i}`, // Sample mobile
        name: `Worker ${i}`,
        role: "Sworker", // Sample role
        present: true,
        sworkerId: `sworker${i}`, // Ensure this exists in DB
      },
    });
    
  }

  console.log("Seeding Announcements...");
  // **ANNOUNCEMENTS**
  for (let i = 1; i <= 5; i++) {
    await prisma.announcement.create({
      data: {
        title: `Announcement ${i}`,
        description: `Description for Announcement ${i}`,
        date: new Date(),
      },
    });
  }

  console.log("✅ Seeding completed successfully!");


  const events = [
    {
      title: "Cleanup Drive",
      description: "A community cleanup event to maintain cleanliness.",
      startTime: new Date(new Date().setHours(9, 0, 0, 0)), // 9:00 AM today
    },
    {
      title: "Waste Management Workshop",
      description: "Educational session on proper waste disposal methods.",
      startTime: new Date(new Date().setHours(14, 0, 0, 0)), // 2:00 PM today
    },
    {
      title: "Sanitation Workers Meeting",
      description: "Discussion on improving sanitation processes.",
      startTime: new Date(new Date().setHours(17, 0, 0, 0)), // 5:00 PM today
    },
    {
      title: "Health Check-up Camp",
      description: "Medical check-up camp for sanitation workers.",
      startTime: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
    },
    {
      title: "Recycling Awareness Campaign",
      description: "A campaign to raise awareness about recycling.",
      startTime: new Date(new Date().setDate(new Date().getDate() + 2)), // Day after tomorrow
    },
  ];

  for (const event of events) {
    await prisma.event.create({ data: event });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error during seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
