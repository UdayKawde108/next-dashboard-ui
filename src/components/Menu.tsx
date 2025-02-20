import Link from "next/link";
import Image from 'next/image';
import { currentUser } from "@clerk/nextjs/server";


const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "smaster", "sworker", "user", "binalert"],
      },
      {
        icon: "/teacher.png",
        label: "Smaster",
        href: "/list/smaster",
        visible: ["admin", "smaster"],
      },
      {
        icon: "/student.png",
        label: "Sworker",
        href: "/list/sworker",
        visible: ["admin", "sworker"],
      },
      {
        icon: "/parent.png",
        label: "Users",
        href: "/list/users",
        visible: ["admin", "user"],
      },
      {
        icon: "/singleBranch.png",
        label: "Areas",
        href: "/list/areas",
        visible: ["admin", "smaster","sworker"],
      },
      {
        icon: "/singleBranch.png",
        label: "Bin Status",
        href: "/list/binstatus",
        visible: ["admin", "smaster","sworker"],
      },
      {
        icon: "/singleBranch.png",
        label: "Bin Level",
        href: "/list/binlevel",
        visible: ["admin", "smaster","sworker"],
      },

      {
        icon: "/singleBranch.png",
        label: "Bin Local",
        href: "/list/binlocal",
        visible: ["admin", "smaster","sworker"],
      },
      {
        icon: "/subject.png",
        label: "Binalert",
        href: "/list/binalert",
        visible: ["admin","smaster"],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/list/atten",
        visible: ["admin", "sworker", "smaster"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "smaster", "sworker", "user"],
      },
      {
        icon: "/announcement.png",
        label: "Announcement",
        href: "/list/announcement",
        visible: ["admin", "smaster", "sworker", "user"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "smaster", "sworker", "user"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "smaster", "sworker", "user"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "smaster", "sworker", "user"],
      },
    ],
  },
];

const Menu = async () => {
  const user = await currentUser()
  const role = user?.publicMetadata.role as string
  return (
    <div className='mt-4 text-sm'>
      {menuItems.map(i=>(
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">{i.title}</span>
          {i.items.map(item=>{if(item.visible.includes(role)){
            return (<Link href={item.href} key={item.label} className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 flex-wrap rounded-md hover:bg-lamaSkyLight">
              <Image src={item.icon} alt="" width={20} height={20}/>
              <span className="hodden lg:block">{item.label}</span>
              </Link>)
          }})}
          </div>
          
          ))}
    </div>
  )
}

export default Menu