import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Dashborad from "../Pages/Dashboard/Dashborad";
import Login from "../Pages/Authentication/Login";
import AdminHome from "../Pages/Dashboard/AdminHome";
import PackageManagement from "../Pages/Dashboard/PackageManagement";
import Billing from "../Pages/Dashboard/Billing";

import UserManagement from "../Pages/Dashboard/UserManagement/UserManagement";
import ClosetManagement from "../Pages/Dashboard/ClosetManagement/ClosetManagement";
import FashionManagement from "../Pages/Dashboard/ClosetManagement/FashionManagement";
import FashionLibraryManagement from "../Pages/Dashboard/ClosetManagement/FashionLibraryManagement";
import IndividualCloset from "../Pages/Dashboard/ClosetManagement/IndividualCloset";
import AI_Performence from "../Pages/Dashboard/AIPerformence/AI_Performence";
import BrandPartners from "../Pages/Dashboard/BrandPartners/BrandPartners";
import Analytics from "../Pages/Dashboard/Analytics/Analytics";
import History from "../Pages/Dashboard/History/History";
import Support from "../Pages/Dashboard/Support/Support";
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";

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
        path: "user_management/user_profile/:userId",
        element: <UserProfile />,
      },
      {
        path: "closet_management",
        element: <ClosetManagement />,
      },
      {
        path: "fashion_management",
        element: <FashionLibraryManagement />,
      },
      {
        path: "closet_showcase/:id",
        element: <IndividualCloset />,
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
        path: "brand_partners",
        element: <BrandPartners />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "support",
        element: <Support></Support>,
      },
      {
        path: "history",
        element: <History></History>,
      },
    ],
  },
]);
