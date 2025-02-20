import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { Prisma, Task, Smaster } from "@prisma/client";
import Image from 'next/image';
import Link from "next/link";
import { Area } from "@prisma/client";
import { ITEM_PER_PAGE } from "@/lib/settings";
import FormContainer from "@/components/FormContainer";

// Table columns definition


const SmasterListPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined }; }) => {

  // Get page and query parameters
  const userRole=await role();
  const columns = [
    {
      header: "Info", accessor: "info"
    },
    {
      header: "Smaster ID", accessor: "smasterId", className: "hidden md:table-cell",
    },
    {
      header: "Areas", accessor: "Areas", className: "hidden md:table-cell",
    },
    {
      header: "Phone", accessor: "phone", className: "hidden md:table-cell",
    },
    {
      header: "Address", accessor: "address", className: "hidden md:table-cell",
    },
    ...(userRole === "admin"?[{ header: "Actions", accessor: "action" }]:[]),
  ]
  
  
  
  
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.TaskWhereInput = {};

if (queryParams) {
  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined) {
      switch (key) {
        case "areaId":
          query.areaId = parseInt(value); // Filter by areaId
          break;

        case "smasterId":
          query.smasterId = value; // Filter by smasterId
          break;

        case "sworkerId":
          // Filter tasks by the sworkerId via the related smaster task assignment.
          query.smaster = {
            sworkers: {
              some: {
                id: value, // Filtering tasks that are assigned to a sworker with the provided ID
              },
            },
          };
          case "search":
            query.OR = [
              { smaster: { name: { contains: value, mode: "insensitive" } } },
              { smaster: { username: { contains: value, mode: "insensitive" } } },
              { smaster: { id: { contains: value, mode: "insensitive" } } },
              { 
                area: { // ✅ Correct: Filtering tasks based on area name
                  name: { contains: value, mode: "insensitive" }
                }
              },
            ];
  break;


        default:
          console.warn(`Unhandled query parameter: ${key}`);
      }
    }
  }
}

// Fetch tasks and count with the adjusted query
const [data, count] = await prisma.$transaction([
  prisma.task.findMany({
    where: query,
    include: {
      smaster: true, // Include smaster details
      area: true,    // Include area details
    },
    take: ITEM_PER_PAGE,
    skip: ITEM_PER_PAGE * (p - 1),
  }),
  prisma.task.count({
    where: query,
  }),
]);

  // Render a row for each task
  const renderRow = (item: Task & { smaster: Smaster; area: Area }) => (
    <tr key={item.id} className="border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-4">
        <Image src={item.smaster.img || "/noAvatar.png"} alt="" width={40} height={50} className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.smaster.name}</h3>
          <p className="text-xs text-gray-500">{item.smaster.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.smaster.username}</td>
      <td className="hidden md:table-cell">{item.area?.name || "No Area Assigned"}</td>

      <td className="hidden md:table-cell">{item.smaster.phone}</td>
      <td className="hidden md:table-cell">{item.smaster.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/smaster/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt={""} width={16} height={16} />
            </button>
          </Link>

          {userRole === "admin" && (
            <FormContainer table="smaster" type="delete" id={Number(item.smasterId)} />
          )}
        </div>
      </td>
    </tr>
  );

  // Return the component JSX
  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* Top section with filters and buttons */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Sanitation Master</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>

            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>

            {userRole === "admin" && (
              <FormContainer table="smaster" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* Table displaying tasks */}
      <Table columns={columns} renderRow={renderRow} data={data} />

      {/* Pagination */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default SmasterListPage;
