import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { role } from "@/lib/utils";
import { Prisma, Sworker, User } from "@prisma/client";
import Image from 'next/image';
import Link from "next/link";

type UserList = User & { sworkers: Sworker[] };



const UsersListPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {


const userRole = await role();

  const columns = [
    { header: "Info", accessor: "info" },
    { header: "Phone", accessor: "phone", className: "hidden md:table-cell" },
    { header: "Sworker Name", accessor: "sworkername", className: "hidden md:table-cell" },
    { header: "Address", accessor: "address", className: "hidden md:table-cell" },
    ...(userRole === "admin"?[{ header: "Actions", accessor: "action" }]:[]),
  ];


  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.UserWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.OR = [
              { username: { contains: value, mode: "insensitive" } },
              { name: { contains: value, mode: "insensitive" } },
              { surname: { contains: value, mode: "insensitive" } },
              { phone: { contains: value, mode: "insensitive" } },
              { address: { contains: value, mode: "insensitive" } },
            ];
            break;

          case "sworkerId":
            query.sworkers = { some: { id: value } };
            break;

          default:
            console.warn(`Unhandled query parameter: ${key}`);
        }
      }
    }
  }

  // Fetch users and count with the adjusted query
  const [data, count] = await prisma.$transaction([
    prisma.user.findMany({
      where: query,
      include: { sworkers: true }, // Include associated sworkers
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.user.count({ where: query }), // Count total users matching query
  ]);

  const renderRow = (item: UserList) => (
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
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">
        {item.sworkers.length > 0 ? item.sworkers.map(sw => sw.name).join(", ") : "No Sworker"}
      </td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
        {userRole === "admin" && (<><FormModal table="users" type="delete" id={item.id} />
          <FormModal table="users" type="update" data={item} /></>)}
          
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Users</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {/* Only show 'Create' button if role is 'admin' */}
            {userRole==="admin" && <FormModal table="users" type="create" />}
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

export default UsersListPage;
