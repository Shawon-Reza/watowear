import { CircleDollarSign, DollarSign, Sparkles, Users } from "lucide-react";
import { useState, useEffect } from "react";
import {
	LineChart,
	Line,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

// Mock data for the dashboard
const mockStats = {
	totalUsers: 12847,
	activeUsers: 8934,
	revenue: 45678,
	subscriptions: 2341,
};

const mockUserJoins = [
	{ month: "Jan", users: 1200 },
	{ month: "Feb", users: 1890 },
	{ month: "Mar", users: 2340 },
	{ month: "Apr", users: 1980 },
	{ month: "May", users: 2890 },
	{ month: "Jun", users: 3200 },
];

const mockRevenueData = [
	{ month: "Jan", revenue: 12000 },
	{ month: "Feb", revenue: 18900 },
	{ month: "Mar", revenue: 23400 },
	{ month: "Apr", revenue: 19800 },
	{ month: "May", revenue: 28900 },
	{ month: "Jun", revenue: 32000 },
];

const mockLatestUsers = [
	{
		id: 1,
		name: "John Doe",
		email: "john@example.com",
		avatar: "JD",
		joinedAt: "2024-01-15",
	},
	{
		id: 2,
		name: "Jane Smith",
		email: "jane@example.com",
		avatar: "JS",
		joinedAt: "2024-01-14",
	},
	{
		id: 3,
		name: "Mike Johnson",
		email: "mike@example.com",
		avatar: "MJ",
		joinedAt: "2024-01-13",
	},
	{
		id: 4,
		name: "Sarah Wilson",
		email: "sarah@example.com",
		avatar: "SW",
		joinedAt: "2024-01-12",
	},
	{
		id: 5,
		name: "David Brown",
		email: "david@example.com",
		avatar: "DB",
		joinedAt: "2024-01-11",
	},
];

export default function AdminHome() {
	const [mounted, setMounted] = useState(false);
	const [users, setUsers] = useState(mockLatestUsers);

	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleStatus = () => {
		setUsers(
			users.map((user) =>
				user.id === userId
					? {
							...user,
							status:
								user.status === "Active"
									? "Inactive"
									: "Active",
					  }
					: user
			)
		);
	};

	const makeAdmin = () => {
		setUsers(
			users.map((user) =>
				user.id === userId ? { ...user, role: "Admin" } : user
			)
		);
	};

	const deleteUser = () => {
		setUsers(users.filter((user) => user.id !== userId));
	};

	if (!mounted) {
		return (
			<div
				className="min-h-screen"
				style={{ backgroundColor: "#F4F1EB" }}
			/>
		);
	}

	return (
		<div className="min-h-screen">
			<main className="">
				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-gray-500 text-md font-bold">
									Total Users
								</p>
								<p
									className="text-3xl font-bold mt-2"
									style={{ color: "#6A6D57" }}
								>
									{mockStats.totalUsers.toLocaleString()}
								</p>
							</div>
							<div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gray-100">
								<Users className="text-[#6A6D57]" />
							</div>
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-gray-500 text-md font-bold">
									Active Users
								</p>
								<p className="text-3xl font-bold mt-2 text-[#6A6D57]">
									{mockStats.activeUsers.toLocaleString()}
								</p>
							</div>
							<div className="w-14 h-14 bg-[#6A6D57]/10 rounded-xl flex items-center justify-center">
								<Sparkles className="text-[#6A6D57]" />
							</div>
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-gray-500 text-md font-bold">
									Revenue
								</p>
								<p className="text-3xl font-bold mt-2 text-green-600">
									${mockStats.revenue.toLocaleString()}
								</p>
							</div>
							<div className="w-14 h-14 bg-[#6A6D57]/10 rounded-xl flex items-center justify-center">
								<CircleDollarSign className="text-[#6A6D57]" />
							</div>
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-gray-500 text-md font-bold">
									Subscriptions
								</p>
								<p className="text-3xl font-bold mt-2 text-[#6A6D57]">
									{mockStats.subscriptions.toLocaleString()}
								</p>
							</div>
							<div className="w-14 h-14 bg-[#6A6D57]/10 rounded-xl flex items-center justify-center">
								<DollarSign className="text-[#6A6D57]" />
							</div>
						</div>
					</div>
				</div>

				{/* Charts Section */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
					{/* User Joins Chart */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
						<div className="mb-6">
							<h3
								className="text-xl font-bold"
								style={{ color: "#6A6D57" }}
							>
								User Joins
							</h3>
							<p className="text-gray-500 text-sm mt-1">
								Monthly user registration trends
							</p>
						</div>
						<ResponsiveContainer width="100%" height={300}>
							<LineChart data={mockUserJoins}>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="#f0f0f0"
								/>
								<XAxis
									dataKey="month"
									stroke="#6A6D57"
									fontSize={12}
								/>
								<YAxis stroke="#6A6D57" fontSize={12} />
								<Tooltip
									contentStyle={{
										backgroundColor: "white",
										border: "1px solid #e5e7eb",
										borderRadius: "8px",
										boxShadow:
											"0 4px 6px -1px rgba(0, 0, 0, 0.1)",
									}}
								/>
								<Line
									type="monotone"
									dataKey="users"
									stroke="#6A6D57"
									strokeWidth={3}
									dot={{
										fill: "#6A6D57",
										strokeWidth: 2,
										r: 4,
									}}
									activeDot={{
										r: 6,
										stroke: "#6A6D57",
										strokeWidth: 2,
									}}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>

					{/* Revenue Chart */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
						<div className="mb-6">
							<h3
								className="text-xl font-bold"
								style={{ color: "#6A6D57" }}
							>
								Subscription Revenue
							</h3>
							<p className="text-gray-500 text-sm mt-1">
								Monthly revenue from subscriptions
							</p>
						</div>
						<ResponsiveContainer width="100%" height={300}>
							<BarChart data={mockRevenueData}>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="#f0f0f0"
								/>
								<XAxis
									dataKey="month"
									stroke="#6A6D57"
									fontSize={12}
								/>
								<YAxis stroke="#6A6D57" fontSize={12} />
								<Tooltip
									contentStyle={{
										backgroundColor: "white",
										border: "1px solid #e5e7eb",
										borderRadius: "8px",
										boxShadow:
											"0 4px 6px -1px rgba(0, 0, 0, 0.1)",
									}}
									formatter={(value) => [
										`$${value.toLocaleString()}`,
										"Revenue",
									]}
								/>
								<Bar
									dataKey="revenue"
									fill="#6A6D57"
									radius={[4, 4, 0, 0]}
								/>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
					<div className="px-8 py-6 border-b border-gray-100">
						<h3
							className="text-2xl font-bold"
							style={{ color: "#6A6D57" }}
						>
							Latest Users
						</h3>
						<p className="text-gray-500 text-sm mt-1">
							Recently joined users
						</p>
					</div>

					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gradient-to-r from-[#F4F1EB] to-white">
								<tr>
									<th className="px-8 py-6 text-left font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
										User
									</th>
									<th className="px-8 py-6 text-left font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
										Email
									</th>
									<th className="px-8 py-6 text-left font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
										Joined Date
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-[#6A6D57]/10 cursor-pointer">
								{users.map((user, idx) => (
									<tr
										key={user.id}
										className="group hover:bg-gradient-to-r  hover:from-[#6A6D57]/5 hover:to-[#6A6D57]/10 transition-all duration-300 hover:shadow-md"
									>
										{/* User Info */}
										<td className="px-8 py-5 ">
											<div className="flex items-center gap-4">
												<div className="relative">
													<div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#6A6D57] to-[#5A5D4A] flex items-center justify-center text-white font-bold text-lg shadow-lg">
														{user.avatar}
													</div>
												</div>
												<div className="space-y-1">
													<p className="font-bold text-[#6A6D57] text-lg group-hover:text-[#5A5D4A] transition-colors">
														{user.name}
													</p>
												</div>
											</div>
										</td>

										{/* Email */}
										<td className="px-8 py-5">
											<p className="text-[#6A6D57]/80 text-base font-medium">
												{user.email}
											</p>
										</td>

										{/* Joined Date */}
										<td className="px-8 py-5">
											<span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-[#6A6D57]/10 to-[#6A6D57]/20 text-[#6A6D57] shadow-sm">
												{new Date(
													user.joinedAt
												).toLocaleDateString("en-US", {
													year: "numeric",
													month: "short",
													day: "numeric",
												})}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</main>
		</div>
	);
}
