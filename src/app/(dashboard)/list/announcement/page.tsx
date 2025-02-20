import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import { Announcement, Prisma } from "@prisma/client";
import Image from 'next/image';
import Link from "next/link";
//import { role } from "@/lib/data";



const AnnouncementListPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const { page, search } = searchParams;
  const p = page ? parseInt(page) : 1;
  //const { sessionClaims } =await auth();
//const role=(sessionClaims?.metadata as {role?:string})?.role;


const userRole=await role();
const columns = [
  { header: "Title", accessor: "title" },
  { header: "Date", accessor: "date", className: "hidden md:table-cell" },
  ...(userRole === "admin"?[{ header: "Actions", accessor: "action" }]:[]),
];




  // Query: Search announcements by title (if search exists)
  const query: Prisma.AnnouncementWhereInput = search
    ? {
        title: {
          contains: search,
          mode: "insensitive",
        },
      }
    : {};

  // Fetch filtered data & count
  const [data, count] = await prisma.$transaction([
    prisma.announcement.findMany({
      where: query,
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.announcement.count({ where: query }),
  ]);

  // Render Each Row
  const renderRow = (item: Announcement) => (
    <tr key={item.id} className="border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="p-4">{item.title}</td>
      <td className="hidden md:table-cell">
      {new Date(item.date).toLocaleDateString()} {/* Format date */}
    </td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/smaster/${item.id}`}>
            {/*<button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/edit.png" alt="" width={16} height={16} />
            </button>*/}
          </Link>
          {(userRole === "admin" || userRole === "smaster" )&& (
            <>
           <FormModal table="announcement" type="update" data={item}/>
           <FormModal table="announcement" type="delete" id={item.id}/>
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Announcements</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {userRole === "admin" && <FormModal table="announcement" type="create" />}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />

      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default AnnouncementListPage;