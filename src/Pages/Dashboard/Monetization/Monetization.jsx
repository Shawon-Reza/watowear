import {
	BadgeDollarSign,
	Filter,
	MoreHorizontal,
	Plus,
	Search,
	Trash2,
	Users,
	Zap,
} from "lucide-react";
import { useState } from "react";
import {
	Bar,
	BarChart,
	Cell,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const Monetization = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeTab, setActiveTab] = useState("All");

	// Mock Data for Stats
	const stats = [
		{
			title: "Monthly Revenue",
			value: "$18,950",
			change: "+3",
			trend: "vs last month",
			icon: <BadgeDollarSign size={24} className="text-green-600" />,
			bg: "bg-green-100",
			trendColor: "text-green-500",
		},
		{
			title: "Active Subscription",
			value: "5,487",
			change: "+2,546",
			trend: "vs last month",
			icon: <Users size={24} className="text-blue-600" />,
			bg: "bg-blue-100",
			trendColor: "text-green-500",
		},
		{
			title: "Convention Rate",
			value: "33%",
			change: "+12.5%",
			trend: "vs last month",
			icon: <Zap size={24} className="text-purple-600" />,
			bg: "bg-purple-100",
			trendColor: "text-green-500",
		},
		{
			title: "Churn Rate",
			value: "3.8%",
			change: "+0.5%",
			trend: "vs last month",
			icon: <BadgeDollarSign size={24} className="text-red-600" />, // Using BadgeDollarSign as generic placeholder if Churn icon not specific
			bg: "bg-red-100",
			trendColor: "text-red-500",
		},
	];

	// Mock Data for Plan Distribution
	const planDistribution = [
		{ name: "Free", value: 8234, color: "bg-[#2C2C2C]" },
		{ name: "Premium ($9.99/mo)", value: 5678, color: "bg-[#6A6D57]" },
		{
			name: "Premium Plus ($19.99/mo)",
			value: 1322,
			color: "bg-[#A3A599]",
		},
	];

	// Mock Data for Cancellation Reasons
	const cancellationReasons = [
		{ reason: "Too expensive", percentage: "39%" },
		{ reason: "Not using enough", percentage: "23%" },
		{ reason: "Missing features", percentage: "18%" },
		{ reason: "Technical issues", percentage: "12%" },
	];

	// Mock Data for Affiliate Revenue
	const affiliateRevenue = [
		{ label: "Partner Product Sales", value: "$12,450" },
		{ label: "Commission Earned", value: "$1,867" },
		{ label: "Conversion Rate", value: "5.8%" },
	];

	// Mock Data for Active Subscriptions
	const subscriptions = [
		{
			user: "Sarah Johnson",
			email: "sarah@example.com",
			plan: "Enterprise",
			status: "Active",
			amount: "$499.00",
			renewal: "12/15/2023",
			start: "6/15/2023",
		},
		{
			user: "Michael Chen",
			email: "michael@example.com",
			plan: "Pro",
			status: "Past Due",
			amount: "$49.00",
			renewal: "11/2/2023",
			start: "5/2/2023",
		},
		{
			user: "Emma Wilson",
			email: "emma@example.com",
			plan: "Basic",
			status: "Canceled",
			amount: "$19.00",
			renewal: "11/15/2023",
			start: "1/10/2023",
		},
		{
			user: "James Rodriguez",
			email: "james@example.com",
			plan: "Pro",
			status: "Active",
			amount: "$49.00",
			renewal: "11/20/2023",
			start: "11/20/2022",
		},
		{
			user: "Olivia Smith",
			email: "olivia@example.com",
			plan: "Enterprise",
			status: "Trial",
			amount: "$0.00",
			renewal: "11/30/2023",
			start: "11/1/2023",
		},
	];

	// Mock Data for Payment History
	const paymentHistory = [
		{
			id: "IN-001234",
			user: "Sarah Johnson",
			email: "sarah@example.com",
			amount: "$499.00",
			status: "Succeeded",
			date: "11/15/2023",
			method: "Visa ending in 4242",
		},
		{
			id: "IN-005678",
			user: "Michael Chen",
			email: "michael@example.com",
			amount: "$49.00",
			status: "Failed",
			date: "11/2/2023",
			method: "Mastercard ending in 5555",
		},
		{
			id: "IN-009012",
			user: "Emma Wilson",
			email: "emma@example.com",
			amount: "$19.00",
			status: "Succeeded",
			date: "10/10/2023",
			method: "American Express ending in 0005",
		},
		{
			id: "IN-003456",
			user: "James Rodriguez",
			email: "james@example.com",
			amount: "$49.00",
			status: "Succeeded",
			date: "10/20/2023",
			method: "Visa ending in 9876",
		},
		{
			id: "IN-007890",
			user: "Olivia Smith",
			email: "olivia@example.com",
			amount: "$499.00",
			status: "Refunded",
			date: "10/5/2023",
			method: "Mastercard ending in 1234",
		},
		{
			id: "IN-002468",
			user: "William Taylor",
			email: "william@example.com",
			amount: "$49.00",
			status: "Failed",
			date: "9/25/2023",
			method: "Visa ending in 5678",
		},
		{
			id: "IN-001357",
			user: "Sophia Brown",
			email: "sophia@example.com",
			amount: "$19.00",
			status: "Succeeded",
			date: "9/15/2023",
			method: "Discover ending in 9012",
		},
	];

	const getStatusBatch = (status) => {
		switch (status) {
			case "Active":
			case "Succeeded":
				return "bg-green-100 text-green-700";
			case "Past Due":
			case "Failed":
				return "bg-red-100 text-red-700";
			case "Canceled":
				return "bg-gray-100 text-gray-600";
			case "Trial":
			case "Refunded":
				return "bg-purple-100 text-purple-700";
			default:
				return "bg-gray-100 text-gray-600";
		}
	};

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold text-[#1B1B1B]">
						Monetization Management
					</h1>
				</div>
				<button
					onClick={() => setIsModalOpen(true)}
					className="bg-[#6A6D57] hover:bg-[#585a48] text-white px-6 py-2.5 rounded-lg font-bold transition-colors shadow-sm"
				>
					Configure Plans
				</button>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat, index) => (
					<div
						key={index}
						className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
					>
						<div className="flex justify-between items-start mb-4">
							<div>
								<p className="text-sm font-medium text-gray-500 mb-1">
									{stat.title}
								</p>
								<h3 className="text-3xl font-bold text-[#1B1B1B]">
									{stat.value}
								</h3>
							</div>
							<div
								className={`p-3 rounded-xl ${stat.bg} bg-opacity-50`}
							>
								{stat.icon}
							</div>
						</div>
						<div className="flex items-center gap-2 text-xs font-semibold">
							<span className={stat.trendColor}>
								{stat.change}
							</span>
							<span className="text-gray-400">{stat.trend}</span>
						</div>
					</div>
				))}
			</div>

			{/* Overview Section */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Plan Distribution */}
				<div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
					<h3 className="font-bold text-[#1B1B1B] mb-6">
						Plan Distribution
					</h3>
					<div className="space-y-6">
						{planDistribution.map((plan, index) => (
							<div key={index}>
								<div className="flex justify-between text-sm mb-2">
									<span className="font-medium text-gray-700">
										{plan.name}
									</span>
									<span className="font-semibold text-[#1B1B1B]">
										{plan.value.toLocaleString()} users
									</span>
								</div>
								<div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
									<div
										className={`h-full rounded-full ${plan.color}`}
										style={{
											width: `${
												(plan.value / 10000) * 100
											}%`,
										}}
									></div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Top Cancellation Reasons */}
				<div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
					<h3 className="font-bold text-[#1B1B1B] mb-6">
						Top Cancellation Reasons
					</h3>
					<div className="space-y-4">
						{cancellationReasons.map((item, index) => (
							<div
								key={index}
								className="flex items-center justify-between"
							>
								<span className="text-sm font-medium text-gray-700">
									{item.reason}
								</span>
								<span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
									{item.percentage}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Affiliate Revenue */}
				<div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
					<h3 className="font-bold text-[#1B1B1B] mb-6">
						Affiliate Revenue
					</h3>
					<div className="space-y-6">
						{affiliateRevenue.map((item, index) => (
							<div
								key={index}
								className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0"
							>
								<span className="text-sm font-medium text-gray-500">
									{item.label}
								</span>
								<span className="text-lg font-bold text-[#1B1B1B]">
									{item.value}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Subscription Management */}
			<div>
				<h2 className="text-xl font-bold text-[#1B1B1B] mb-2">
					Subscription Management
				</h2>
				<p className="text-sm text-gray-500 mb-6">
					Manage user subscriptions, payments, and billing information
				</p>

				<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
					{/* Filters */}
					<div className="p-4 flex items-center justify-between gap-4 border-b border-gray-100">
						<div className="relative w-full max-w-md">
							<Search
								className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
								size={18}
							/>
							<input
								type="text"
								placeholder="Search by user or email..."
								className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57]"
							/>
						</div>
						<button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
							<Filter size={16} />
							Filter
						</button>
					</div>

					{/* Table */}
					<div className="overflow-x-auto">
						<h3 className="px-6 py-4 font-bold text-gray-700 bg-gray-50 border-b border-gray-200">
							Active Subscriptions
							<span className="block text-xs font-normal text-gray-500 mt-1">
								Manage user subscription plans and billing
								cycles
							</span>
						</h3>
						<table className="w-full text-left border-collapse">
							<thead className="bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
								<tr>
									<th className="px-6 py-4">User</th>
									<th className="px-6 py-4">Plan</th>
									<th className="px-6 py-4">Status</th>
									<th className="px-6 py-4">Amount</th>
									<th className="px-6 py-4">Next Renewal</th>
									<th className="px-6 py-4">Start Date</th>
									<th className="px-6 py-4 text-right">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-100">
								{subscriptions.map((sub, index) => (
									<tr
										key={index}
										className="hover:bg-gray-50 transition-colors"
									>
										<td className="px-6 py-4">
											<div className="font-bold text-[#1B1B1B] text-sm">
												{sub.user}
											</div>
											<div className="text-xs text-gray-400">
												{sub.email}
											</div>
										</td>
										<td className="px-6 py-4 text-sm text-gray-600 font-medium">
											{sub.plan}
										</td>
										<td className="px-6 py-4">
											<span
												className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBatch(
													sub.status
												)}`}
											>
												{sub.status}
											</span>
										</td>
										<td className="px-6 py-4 text-sm text-[#1B1B1B] font-bold">
											{sub.amount}
										</td>
										<td className="px-6 py-4 text-sm text-gray-600">
											{sub.renewal}
										</td>
										<td className="px-6 py-4 text-sm text-gray-600">
											{sub.start}
										</td>
										<td className="px-6 py-4 text-right">
											<div className="flex items-center justify-end gap-2">
												<button className="px-2 py-1 text-xs font-medium text-yellow-600 bg-yellow-50 rounded hover:bg-yellow-100 border border-yellow-200">
													Pause
												</button>
												<button className="px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded hover:bg-red-100 border border-red-200">
													Cancel
												</button>
												<button className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 border border-blue-200">
													Edit
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{/* Payment History */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
				<div className="px-6 py-4 border-b border-gray-200">
					<h3 className="font-bold text-[#1B1B1B]">
						Payment History
					</h3>
					<p className="text-xs text-gray-500 mt-1">
						View and manage payment transactions
					</p>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full text-left border-collapse">
						<thead className="bg-[#F9FAFB] text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
							<tr>
								<th className="px-6 py-4">Transaction</th>
								<th className="px-6 py-4">User</th>
								<th className="px-6 py-4">Amount</th>
								<th className="px-6 py-4">Status</th>
								<th className="px-6 py-4">Date</th>
								<th className="px-6 py-4">Payment Method</th>
								<th className="px-6 py-4 text-right">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{paymentHistory.map((payment, index) => (
								<tr
									key={index}
									className="hover:bg-gray-50 transition-colors"
								>
									<td className="px-6 py-4">
										<div className="font-medium text-[#1B1B1B] text-sm">
											{payment.id}
										</div>
									</td>
									<td className="px-6 py-4">
										<div className="font-medium text-[#1B1B1B] text-sm">
											{payment.user}
										</div>
										<div className="text-xs text-gray-400">
											{payment.email}
										</div>
									</td>
									<td className="px-6 py-4 text-sm text-[#1B1B1B] font-medium">
										{payment.amount}
									</td>
									<td className="px-6 py-4">
										<span
											className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBatch(
												payment.status
											)}`}
										>
											{payment.status}
										</span>
									</td>
									<td className="px-6 py-4 text-sm text-gray-600">
										{payment.date}
									</td>
									<td className="px-6 py-4 text-sm text-gray-600">
										{payment.method}
									</td>
									<td className="px-6 py-4 text-right">
										<div className="flex items-center justify-end gap-2">
											{payment.status === "Succeeded" && (
												<button className="px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded hover:bg-red-100 border border-red-200">
													Refund
												</button>
											)}
											<button className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 border border-blue-200">
												Details
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Configure Plans Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
					<div className="bg-white rounded-xl shadow-xl w-full max-w-[800px] max-h-[90vh] overflow-y-auto">
						{/* Modal Header */}
						<div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
							<h2 className="text-2xl font-bold text-[#1B1B1B]">
								Pro Plan
							</h2>
							<button className="text-gray-400 hover:text-gray-600">
								{/* Edit Icon from design is redundant if we are already in edit mode, usually X to close */}
								{/* Standard Close X */}
								<div
									onClick={() => setIsModalOpen(false)}
									className="cursor-pointer"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="lucide lucide-x"
									>
										<path d="M18 6 6 18" />
										<path d="m6 6 18 18" />
									</svg>
								</div>
							</button>
						</div>

						{/* Modal Body */}
						<div className="p-8">
							<form className="space-y-6">
								{/* Plan Name */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Plan Name
									</label>
									<input
										type="text"
										defaultValue="Pro plan"
										className="w-full px-4 py-3 border border-gray-200 rounded-lg text-lg text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57]"
									/>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{/* Price */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Price ($)
										</label>
										<input
											type="text"
											defaultValue="0"
											className="w-full px-4 py-3 border border-gray-200 rounded-lg text-lg text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57]"
										/>
									</div>

									{/* Duration */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Duration
										</label>
										<input
											type="text"
											defaultValue="30 days"
											className="w-full px-4 py-3 border border-gray-200 rounded-lg text-lg text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57]"
										/>
									</div>
								</div>

								{/* Billing */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Billing
									</label>
									<input
										type="text"
										defaultValue="Monthly"
										className="w-full px-4 py-3 border border-gray-200 rounded-lg text-lg text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57]"
									/>
								</div>

								{/* Features List */}
								<div>
									<h3 className="text-xl font-medium text-[#1B1B1B] mb-4">
										Features List
									</h3>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										{[1, 2, 3, 4].map((i) => (
											<div key={i}>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Main Feature -{i}
												</label>
												<div className="relative">
													<input
														type="text"
														placeholder="Features condition"
														className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-400 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57]"
													/>
													<button
														type="button"
														className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-600"
													>
														<Trash2 size={18} />
													</button>
												</div>
											</div>
										))}
									</div>

									<div className="mt-6 flex gap-3">
										<input
											type="text"
											placeholder="Add new features (optional)"
											className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57]"
										/>
										<button
											type="button"
											className="px-4 py-3 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50"
										>
											<Plus size={20} />
										</button>
									</div>
								</div>
							</form>
						</div>

						{/* Modal Footer */}
						<div className="px-8 py-6">
							<button className="w-full py-4 bg-[#6A6D57] hover:bg-[#585a48] text-white font-bold rounded-lg transition-colors text-lg flex items-center justify-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide lucide-save"
								>
									<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
									<polyline points="17 21 17 13 7 13 7 21" />
									<polyline points="7 3 7 8 15 8" />
								</svg>
								Save Changes
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Monetization;
