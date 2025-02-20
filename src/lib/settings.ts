export const ITEM_PER_PAGE=10

type RouteAccessMap = {
    [key: string]: string[];
  };
  
  export const routeAccessMap: RouteAccessMap = {
    "/admin(.*)": ["admin"],
    "/sworker(.*)": ["sworker"],
    "/smaster(.*)": ["smaster"],
    "/user(.*)": ["user"],
    "/list/smaster": ["admin", "smaster"],
    "/list/sworker": ["admin", "sworker"],
    "/list/user": ["admin", "user"],
    "/list/area": ["admin"],
    "/list/attendance": ["admin", "smaster", "sworker", "user"],
    "/list/events": ["admin", "smaster", "sworker", "user"],
    "/list/announcements": ["admin", "smaster", "sworker", "user"],
  };