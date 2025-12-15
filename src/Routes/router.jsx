import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Authentication/Login";
import AdminHome from "../Pages/Dashboard/AdminHome";
import Dashborad from "../Pages/Dashboard/Dashborad";
import PackageManagement from "../Pages/Dashboard/PackageManagement";

import AI_Performence from "../Pages/Dashboard/AIPerformence/AI_Performence";
import Analytics from "../Pages/Dashboard/Analytics/Analytics";
import BrandPartners from "../Pages/Dashboard/BrandPartners/BrandPartners";
import Monetization from "../Pages/Dashboard/Monetization/Monetization";
import Editorial from "../Pages/Dashboard/Editorial/Editorial";
import ClosetManagement from "../Pages/Dashboard/ClosetManagement/ClosetManagement";
import FashionLibraryManagement from "../Pages/Dashboard/ClosetManagement/FashionLibraryManagement";
import IndividualCloset from "../Pages/Dashboard/ClosetManagement/IndividualCloset";
import History from "../Pages/Dashboard/History/History";
import Support from "../Pages/Dashboard/Support/Support";
import UserManagement from "../Pages/Dashboard/UserManagement/UserManagement";
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";
import RoleManagement from "../Pages/Dashboard/RoleManagement/RoleManagement";

import PrivateRoute from "./PrivateRoute";

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
		element: (
			<PrivateRoute>
				<Dashborad />
			</PrivateRoute>
		),
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
				path: "role_management",
				element: <RoleManagement />,
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
				path: "monetization",
				element: <Monetization />,
			},
			{
				path: "editorial",
				element: <Editorial />,
			},
			{
				path: "analytics",
				element: <Analytics />,
			},
			{
				path: "support",
				element: <Support />,
			},
			{
				path: "history",
				element: <History />,
			},
		],
	},
]);
