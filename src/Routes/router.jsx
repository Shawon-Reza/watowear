import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Dashborad from "../Pages/Dashboard/Dashborad";
import Login from "../Pages/Authentication/Login";
import AdminHome from "../Pages/Dashboard/AdminHome";
import UserManagement from "../Pages/Dashboard/UserManagement";
import PackageManagement from "../Pages/Dashboard/PackageManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },

  {
    path: "/admin",
    element: <Dashborad />,
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: "admin_home",
        element: <AdminHome />,
      },
      {
        path: "user_management",
        element: <UserManagement />,
      },
      {
        path: "package_management",
        element: <PackageManagement />,
      },
    ],
  },
]);
