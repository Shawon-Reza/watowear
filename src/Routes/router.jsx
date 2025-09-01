import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Dashborad from "../Pages/Dashboard/Dashborad";
import Login from "../Pages/Authentication/Login";
import AdminHome from "../Pages/Dashboard/AdminHome";
import UserManagement from "../Pages/Dashboard/UserManagement";
import PackageManagement from "../Pages/Dashboard/PackageManagement";
import AI_Performence from "../Pages/Dashboard/AI_Performence";
import Billing from "../Pages/Dashboard/Billing";
import Support from "../Pages/Dashboard/Support";

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
      {
        path: "ai_performence",
        element: <AI_Performence />,
      },
      {
        path: "billing",
        element: <Billing />,
      },
      {
        path: "support",
        element: <Support />,
      },
    ],
  },
]);
