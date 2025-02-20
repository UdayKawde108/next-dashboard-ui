import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma, Smaster, Sworker, Task } from "@prisma/client";
import Image from 'next/image';
import Link from "next/link";



const SworkerListPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined }; }) => {
  const userRole=await role();
const columns = [
  {
    header: "Info", 
    accessor: "info"
  },
  {
    header: "Sworker ID", 
    accessor: "studentId", 
    className: "hidden md:table-cell",
  },
  {
    header: "Phone", 
    accessor: "phone", 
    className: "hidden md:table-cell",
  },
  {
    header: "Address", 
    accessor: "address", 
    className: "hidden md:table-cell",
  },
  ...(userRole === "admin"?[{ header: "Actions", accessor: "action" }]:[]),
]
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // Get page and query parameters
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.SworkerWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.username = {
              contains: value,
              mode: "insensitive"
            };
            query.name = {
              contains: value,
              mode: "insensitive"
            };
            query.surname = {
              contains: value,
              mode: "insensitive"
            };
            query.phone = {
              contains: value,
              mode: "insensitive"
            };
            query.address = {
              contains: value,
              mode: "insensitive"
            };
            break;
          
          case "smasterId":
            query.smasters = {
              some: {
                id: value
              }
            };
            break;

          default:
            console.warn(`Unhandled query parameter: ${key}`);
        }
      }
    }
  }

  // Fetch tasks and count with the adjusted query
  const [data, count] = await prisma.$transaction([
    prisma.sworker.findMany({
      where: query,
      include: {
        smasters: true,  // Include related smasters (if needed)
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.sworker.count({
      where: query,
    }),
  ]);

  const renderRow = (item: Sworker & { smasters: Smaster[] }) => (
    <tr key={item.id} className="border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img || "/noAvatar.png"}
          alt={item.username || "No image"}
          width={40}
          height={50}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.username}</h3>
          <p className="text-xs text-gray-500">{item.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.id}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td><p className="text-xs text-gray-500">{item.address}</p></td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/sworker/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt={""} width={16} height={16} />
            </button>
          </Link>

          {userRole === "admin" && (
            <FormModal table="sworker" type="delete" id={Number(item.id)} />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* Top */}
      <div className="flex items-center justify-between"> 
        <h1 className="hidden md:block text-lg font-semibold">All Sanitation Workers</h1> 
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>

            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>

            {userRole === "admin" && (<FormModal table="sworker" type="create" />)}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      <div className=""></div>

      {/* PAGINATION */}
      <Pagination page={p} count={count} />
      <div className=""></div>
    </div>
  );
};

export default SworkerListPage;
