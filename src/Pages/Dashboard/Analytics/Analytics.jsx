import { Clock4, Smartphone, Users } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import AnalyticsGraph from "./AnalyticsGraph";

const Analytics = () => {
	const stats = {
		dailyActive: {
			title: "Daily Active Users",
			value: 12450,
			change: 8.2,
			percent: 95,
			color: "#6366F1",
			barColor: "#4f46e5",
		},
		avgSession: {
			title: "Avg. Session Duration ( At a time )",
			value: "12m 45s",
			change: 1.5,
			percent: 45,
			color: "#22C55E",
			barColor: "#16a34a",
		},
		avgSessionDaily: {
			title: "Avg. Session Duration ( App Daily )",
			value: "2h 45m",
			change: 0.5,
			percent: 60,
			color: "#A855F7",
			barColor: "#9333ea",
		},
	};

	return (
		<section className="space-y-6">
			{/* Top Header */}
			<div className="flex bg-white justify-between items-center py-4 px-6 rounded-xl border border-gray-100 mb-6">
				<div className="flex flex-col">
					<h2 className="text-xl font-medium text-gray-800">
						Hi Admin !
					</h2>
					<p className="text-sm text-gray-500">
						Let's make your work easy
					</p>
				</div>
				<div className="flex items-center gap-3 border-l pl-6">
					<div className="text-right">
						<p className="text-sm font-semibold text-gray-700">
							Admin User
						</p>
					</div>
					<div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
						<Users size={20} className="text-gray-500" />
					</div>
				</div>
			</div>

			<div>
				<h2 className="text-2xl font-semibold text-gray-800 mb-6">
					Analytics overview
				</h2>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				{Object.entries(stats).map(([key, s]) => (
					<div
						key={key}
						className="bg-white rounded-xl shadow-sm border border-gray-100 flex overflow-hidden h-36"
					>
						{/* Vertical color bar */}
						<div
							className="w-1.5 h-full"
							style={{ backgroundColor: s.barColor }}
						/>
						<div className="flex-1 p-5 flex flex-col justify-between">
							<div className="flex justify-between items-start">
								<div>
									<h3 className="text-xs font-medium text-gray-400 mb-1">
										{s.title}
									</h3>
									<h1 className="text-2xl font-bold text-gray-800">
										{typeof s.value === "number"
											? s.value.toLocaleString()
											: s.value}
									</h1>
								</div>
								<div className="p-2 rounded-lg bg-gray-50">
									{key === "dailyActive" && (
										<Users size={20} color={s.color} />
									)}
									{key === "avgSession" && (
										<Clock4 size={20} color={s.color} />
									)}
									{key === "avgSessionDaily" && (
										<Smartphone size={20} color={s.color} />
									)}
								</div>
							</div>

							<div>
								<p className="text-[10px] text-gray-400">
									<span className="text-green-500 font-bold mr-1">
										+{s.change}%
									</span>
									vs last month
								</p>
								<div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
									<div
										className="h-full rounded-full"
										style={{
											width: `${s.percent}%`,
											backgroundColor: s.color,
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			<div>
				<AnalyticsGraph />
			</div>
		</section>
	);
};

export default Analytics;
