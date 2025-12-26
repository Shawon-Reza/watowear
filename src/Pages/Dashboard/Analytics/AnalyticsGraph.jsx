import { useState } from "react";
import {
	Bar,
	BarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Smartphone } from "lucide-react";

const AnalyticsGraph = () => {
	const [timeRange, setTimeRange] = useState("Monthly");

	const mockUserData = [
		{ month: "Jan", users: 8000 },
		{ month: "Feb", users: 9000 },
		{ month: "Mar", users: 8000 },
		{ month: "Apr", users: 11000 },
		{ month: "May", users: 8000 },
		{ month: "Jun", users: 13000 },
		{ month: "Jul", users: 8000 },
		{ month: "Aug", users: 9000 },
		{ month: "Sep", users: 10000 },
		{ month: "Oct", users: 8000 },
		{ month: "Nov", users: 12000 },
		{ month: "Dec", users: 8000 },
	];

	return (
		<div className="space-y-6 pb-10">
			<div className="flex flex-col lg:flex-row gap-6">
				{/* User Growth */}
				<div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
					<div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center">
						<h3 className="text-xl font-semibold text-gray-800">
							User Growth
						</h3>
						<div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg">
							{["Monthly", "Weekly", "Daily"].map((p) => (
								<button
									key={p}
									onClick={() => setTimeRange(p)}
									className={`px-3 py-1 text-xs rounded-md transition-all ${
										timeRange === p
											? "bg-white shadow-sm text-gray-800 font-semibold"
											: "text-gray-400 hover:text-gray-600"
									}`}
								>
									{p}
								</button>
							))}
						</div>
					</div>

					<div className="p-6">
						<div className="h-[340px] w-full">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={mockUserData}>
									<XAxis
										dataKey="month"
										axisLine={false}
										tickLine={false}
										tick={{
											fill: "#9CA3AF",
											fontSize: 12,
										}}
										dy={10}
									/>
									<YAxis
										axisLine={false}
										tickLine={false}
										tick={{
											fill: "#9CA3AF",
											fontSize: 12,
										}}
										ticks={[0, 5000, 10000, 15000]}
										tickFormatter={(v) => `${v / 1000}k`}
									/>
									<Tooltip
										cursor={{ fill: "#f9fafb" }}
										contentStyle={{
											borderRadius: "8px",
											border: "none",
											boxShadow:
												"0 4px 6px -1px rgb(0 0 0 / 0.1)",
										}}
									/>
									<Bar
										dataKey="users"
										fill="#6A6D57"
										radius={[4, 4, 0, 0]}
										barSize={40}
									/>
								</BarChart>
							</ResponsiveContainer>
						</div>

						<div className="mt-6 flex justify-between items-center px-2">
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 rounded-full bg-[#6A6D57]" />
								<span className="text-sm text-gray-500">
									Total Users
								</span>
							</div>
							<span className="text-sm font-semibold text-gray-700">
								14,500 Users
							</span>
						</div>
					</div>
				</div>

				{/* Sidebar cards */}
				<div className="lg:w-[320px] space-y-6">
					{/* User Activity */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
						<h3 className="text-sm font-semibold text-gray-700 mb-6">
							User Activity (Last 7 Days)
						</h3>
						<div className="space-y-6">
							<div>
								<div className="flex justify-between text-xs mb-2">
									<span className="text-gray-400">
										Daily Active Users
									</span>
									<span className="font-semibold text-gray-700">
										1,750
									</span>
								</div>
								<div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
									<div className="h-full bg-blue-500 rounded-full w-[85%]" />
								</div>
							</div>
							<div>
								<div className="flex justify-between text-xs mb-2">
									<span className="text-gray-400">
										New Users
									</span>
									<span className="font-semibold text-gray-700">
										190
									</span>
								</div>
								<div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
									<div className="h-full bg-green-500 rounded-full w-[60%]" />
								</div>
							</div>
						</div>
					</div>

					{/* Device Breakdown */}
					<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
						<h3 className="text-sm font-semibold text-gray-700 mb-6">
							Device Breakdown
						</h3>
						<div className="flex items-center justify-between mb-8">
							<div className="flex flex-col items-center">
								<div className="p-2 rounded-lg bg-blue-50 text-blue-500 mb-2">
									<Smartphone size={18} />
								</div>
								<span className="text-xs text-gray-400">
									iOS
								</span>
								<span className="text-sm font-bold text-gray-800">
									64%
								</span>
							</div>
							<div className="flex flex-col items-center">
								<div className="p-2 rounded-lg bg-green-50 text-green-500 mb-2">
									<Smartphone size={18} />
								</div>
								<span className="text-xs text-gray-400">
									Android
								</span>
								<span className="text-sm font-bold text-gray-800">
									35%
								</span>
							</div>
						</div>

						{/* Segmented bar */}
						<div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex mb-4">
							<div className="h-full bg-blue-500 w-[64%]" />
							<div className="h-full bg-green-500 w-[36%]" />
						</div>

						<div className="flex justify-between text-[10px] text-gray-400">
							<span>iOS v16.2: 78%</span>
							<span>Android v13: 64%</span>
						</div>
					</div>
				</div>
			</div>

			{/* Top User Locations */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
				<h3 className="text-lg font-semibold text-gray-800 mb-8">
					Top User Locations
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8">
					{[
						{ name: "New York, USA", value: 24, color: "#6366F1" },
						{
							name: "Los Angeles, USA",
							value: 18,
							color: "#3B82F6",
						},
						{ name: "London, UK", value: 15, color: "#22C55E" },
						{
							name: "Toronto, Canada",
							value: 12,
							color: "#FBBF24",
						},
					].map((loc) => (
						<div key={loc.name} className="space-y-3">
							<div className="flex justify-between items-center text-sm">
								<div className="flex items-center gap-2">
									<div
										className="w-1.5 h-1.5 rounded-full"
										style={{ backgroundColor: loc.color }}
									/>
									<span className="text-gray-600 font-medium">
										{loc.name}
									</span>
								</div>
								<span className="font-bold text-gray-800">
									{loc.value}%
								</span>
							</div>
							<div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
								<div
									className="h-full rounded-full"
									style={{
										width: `${loc.value * 3}%`,
										backgroundColor: loc.color,
									}}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default AnalyticsGraph;
