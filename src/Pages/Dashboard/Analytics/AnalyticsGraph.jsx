import { useEffect, useState } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const AnalyticsGraph = () => {
	// Sample data for User Growth (monthly)
	const mockUserData = [
		{ month: "Jan", users: 5000 },
		{ month: "Feb", users: 6000 },
		{ month: "Mar", users: 4500 },
		{ month: "Apr", users: 7000 },
		{ month: "May", users: 5500 },
		{ month: "Jun", users: 9000 },
		{ month: "Jul", users: 6500 },
		{ month: "Aug", users: 8000 },
		{ month: "Sep", users: 10000 },
		{ month: "Oct", users: 7500 },
		{ month: "Nov", users: 8500 },
		{ month: "Dec", users: 6000 },
	];

	// Total users (sum of monthly users) — used for the summary at the bottom
	const totalUsers = mockUserData.reduce(
		(sum, item) => sum + (item.users || 0),
		0
	);

	// State for time range selection
	const [timeRange, setTimeRange] = useState("Monthly");

	// Responsive chart sizing (adjusts on window resize)
	const [chartHeight, setChartHeight] = useState(() => {
		if (typeof window === "undefined") return 340;
		const w = window.innerWidth;
		if (w >= 1024) return 340; // lg and up
		if (w >= 640) return 280; // sm - md
		return 220; // mobile
	});

	const [barSize, setBarSize] = useState(() => {
		if (typeof window === "undefined") return 46;
		const w = window.innerWidth;
		if (w >= 1024) return 46;
		if (w >= 640) return 36;
		return 26;
	});

	useEffect(() => {
		function handleResize() {
			const w = window.innerWidth;
			if (w >= 1024) {
				setChartHeight(340);
				setBarSize(46);
			} else if (w >= 640) {
				setChartHeight(280);
				setBarSize(36);
			} else {
				setChartHeight(220);
				setBarSize(26);
			}
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// User Activity Data
	const userActivity = [
		{ label: "Daily Active Users", value: 1750, color: "#3B82F6" },
		{ label: "New Users", value: 190, color: "#10B981" },
	];

	// Device Breakdown Data
	const deviceBreakdown = [
		{ label: "iOS", value: 64, color: "#8B5CF6" },
		{ label: "Android", value: 35, color: "#34D399" },
	];

	// Version Data
	const versionData = [
		{ label: "iOS v16.2", value: 7.8, color: "#8B5CF6" },
		{ label: "Android v13.4", value: 6.4, color: "#34D399" },
	];

	return (
		<div className="rounded-lg">
			<div className="flex flex-col lg:flex-row gap-6">
				{/* Left: User Growth chart */}
				<div className="bg-white rounded-xl shadow border border-gray-100 flex-1">
					<div className="border-b px-6 py-5">
						<h3 className="text-2xl font-extrabold text-gray-800">
							User Growth
						</h3>
					</div>

					<div className="px-6 pt-4">
						<div className="flex items-center gap-3">
							<div className="flex items-center space-x-2">
								<button
									className={`px-3 py-1 rounded-full text-sm font-medium ${
										timeRange === "Monthly"
											? "bg-[#bfc986] text-gray-800"
											: "text-gray-500"
									}`}
									onClick={() => setTimeRange("Monthly")}
								>
									Monthly
								</button>
								<button
									className={`px-3 py-1 rounded-full text-sm font-medium ${
										timeRange === "Weekly"
											? "bg-[#bfc986] text-gray-800"
											: "text-gray-500"
									}`}
									onClick={() => setTimeRange("Weekly")}
								>
									Weekly
								</button>
								<button
									className={`px-3 py-1 rounded-full text-sm font-medium ${
										timeRange === "Daily"
											? "bg-[#bfc986] text-gray-800"
											: "text-gray-500"
									}`}
									onClick={() => setTimeRange("Daily")}
								>
									Daily
								</button>
							</div>
						</div>
					</div>

					<div className="px-6 pb-6">
						<ResponsiveContainer width="100%" height={chartHeight}>
							<BarChart
								data={mockUserData}
								margin={{
									top: 10,
									right: 30,
									left: 0,
									bottom: 0,
								}}
							>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="#f7faf7"
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
										`${value.toLocaleString()} Users`,
										"Users",
									]}
								/>
								<Bar
									dataKey="users"
									fill="#6A6D57"
									radius={[6, 6, 0, 0]}
									barSize={barSize}
								/>
							</BarChart>
						</ResponsiveContainer>

						<div className="flex items-center justify-between mt-4 px-2">
							<div className="flex items-center gap-3">
								<div className="h-3 w-3 rounded-full bg-[#6A6D57]" />
								<div className="text-sm text-gray-600">
									Total Users
								</div>
							</div>
							<div className="text-sm text-gray-700">
								{totalUsers.toLocaleString()} Users
							</div>
						</div>
					</div>
				</div>

				{/* Right: two stacked cards */}
				<div className="flex flex-col gap-6 lg:w-[36%]">
					<div className="bg-white rounded-xl shadow border border-gray-100 p-4">
						<h4 className="text-base font-semibold text-gray-700">
							User Activity (Last 7 Days)
						</h4>
						<div className="mt-4 space-y-4">
							{userActivity.map((item, idx) => (
								<div
									key={idx}
									className="flex items-center justify-between"
								>
									<div className="text-sm text-gray-600">
										{item.label}
									</div>
									<div className="flex items-center gap-3 flex-1 ml-4">
										<div className="w-full max-w-[220px] bg-gray-100 h-3 rounded-full overflow-hidden">
											<ResponsiveContainer
												width="100%"
												height={18}
											>
												<BarChart
													data={[
														{
															name: "a",
															value:
																(item.value /
																	1750) *
																100,
														},
													]}
													layout="vertical"
													margin={{
														top: 0,
														right: 0,
														left: 0,
														bottom: 0,
													}}
												>
													<XAxis
														type="number"
														domain={[0, 100]}
														hide
													/>
													<YAxis
														type="category"
														dataKey="name"
														hide
													/>
													<Bar
														dataKey="value"
														fill={item.color}
														radius={[8, 8, 8, 8]}
														barSize={14}
													/>
												</BarChart>
											</ResponsiveContainer>
										</div>
										<div className="text-sm font-medium">
											{item.value.toLocaleString()}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="bg-white rounded-xl shadow border border-gray-100 p-4">
						<h4 className="text-base font-semibold text-gray-700">
							Device Breakdown
						</h4>
						<div className="mt-4 space-y-4">
							{deviceBreakdown.map((item, idx) => (
								<div
									key={idx}
									className="flex items-center justify-between"
								>
									<div className="flex items-center gap-3">
										<div className="h-9 w-9 rounded-full bg-gray-50 flex items-center justify-center">
											{item.label === "iOS" ? "📱" : "📱"}
										</div>
										<div className="text-sm text-gray-700">
											{item.label}
										</div>
									</div>
									<div className="flex-1 ml-4">
										<div className="w-full bg-gray-100 h-3 rounded-full">
											<ResponsiveContainer
												width="100%"
												height={18}
											>
												<BarChart
													data={[
														{
															name: "a",
															value: item.value,
														},
													]}
													layout="vertical"
													margin={{
														top: 0,
														right: 0,
														left: 0,
														bottom: 0,
													}}
												>
													<XAxis
														type="number"
														domain={[0, 100]}
														hide
													/>
													<YAxis
														type="category"
														dataKey="name"
														hide
													/>
													<Bar
														dataKey="value"
														fill={item.color}
														radius={[8, 8, 8, 8]}
														barSize={14}
													/>
												</BarChart>
											</ResponsiveContainer>
										</div>
										<div className="text-sm text-gray-500 mt-2">
											{item.value}%
										</div>
									</div>
								</div>
							))}

							<div className="mt-2 text-sm text-gray-500">
								{versionData.map((item, index) => (
									<div
										key={index}
										className="flex justify-between"
									>
										<div>{item.label}</div>
										<div>{item.value}%</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnalyticsGraph;
