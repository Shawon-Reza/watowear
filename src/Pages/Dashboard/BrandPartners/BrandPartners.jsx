import {
	ChevronDown,
	DollarSign,
	Filter,
	MoreVertical,
	Percent,
	Plus,
	Search,
	ShoppingBag,
	Tag,
} from "lucide-react";
import { useState } from "react";

const BrandPartners = () => {
	const [activeTab, setActiveTab] = useState("All Partners");
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Mock Data for Stats
	const stats = [
		{
			title: "Total Partners",
			value: "24",
			change: "+3",
			trend: "vs last month",
			icon: <ShoppingBag size={20} className="text-blue-500" />,
			bg: "bg-blue-50",
			barColor: "bg-blue-500",
			barWidth: "w-[70%]",
		},
		{
			title: "Active Products",
			value: "53,247",
			change: "+2,546",
			trend: "vs last month",
			icon: <Tag size={20} className="text-green-500" />,
			bg: "bg-green-50",
			barColor: "bg-green-500",
			barWidth: "w-[85%]",
		},
		{
			title: "Total Revenue",
			value: "$92,786",
			change: "+12.5%",
			trend: "vs last month",
			icon: <DollarSign size={20} className="text-purple-500" />,
			bg: "bg-purple-50",
			barColor: "bg-purple-500",
			barWidth: "w-[60%]",
		},
		{
			title: "Avg. Commission",
			value: "7.8%",
			change: "+0.5%",
			trend: "vs last month",
			icon: <Percent size={20} className="text-orange-500" />,
			bg: "bg-orange-50",
			barColor: "bg-orange-500",
			barWidth: "w-[40%]",
		},
	];

	// Mock Data for Table
	const partners = [
		{
			id: "#1",
			name: "Nordstrom",
			initial: "N",
			category: "Department Store",
			products: "12,450",
			commission: "8%",
			revenue: "$24,560",
			conversion: "4.2%",
			status: "Active",
		},
		{
			id: "#1",
			name: "Nordstrom", // Using dupes as per image for visual check, usually unique
			initial: "H", // H&M?
			category: "Fast Fashion",
			products: "8,750",
			commission: "6%",
			revenue: "$18,320",
			conversion: "3.8%",
			status: "Active",
		},
		{
			id: "#1",
			name: "Nordstrom", // Zara? Z initial
			initial: "Z",
			category: "Fast Fashion",
			products: "9,120",
			commission: "7%",
			revenue: "$21,450",
			conversion: "4.1%",
			status: "Active",
		},
		{
			id: "#1",
			name: "Nordstrom", // Nike? N
			initial: "N",
			category: "Sportswear",
			products: "5,240",
			commission: "9%",
			revenue: "$0",
			conversion: "0%",
			status: "Pending",
		},
		{
			id: "#1",
			name: "Nordstrom", // Adidas? A
			initial: "A",
			category: "Online Retailer",
			products: "15,780",
			commission: "7.5%",
			revenue: "$19,870",
			conversion: "3.9%",
			status: "Active",
		},
		{
			id: "#1",
			name: "Nordstrom", // Levis? L
			initial: "L",
			category: "Denim",
			products: "2,340",
			commission: "8.5%",
			revenue: "$8,760",
			conversion: "2.8%",
			status: "Inactive",
		},
	];

	const getStatusColor = (status) => {
		switch (status) {
			case "Active":
				return "bg-green-100 text-green-700";
			case "Pending":
				return "bg-yellow-100 text-yellow-700";
			case "Inactive":
				return "bg-gray-100 text-gray-600";
			default:
				return "bg-gray-100 text-gray-600";
		}
	};

	return (
		<div className="">
			{/* Page Header */}
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-[#1B1B1B]">
					Shopping & Partners Brand Overview
				</h1>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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
								className={`p-2 rounded-lg ${stat.bg} ${
									stat.title === "Total Partners"
										? "text-blue-500"
										: stat.title === "Active Products"
										? "text-green-500"
										: stat.title === "Total Revenue"
										? "text-purple-500"
										: "text-orange-500"
								}`}
							>
								{stat.icon}
							</div>
						</div>
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-xs">
								<span className="font-bold text-green-500">
									{stat.change}
								</span>
								<span className="text-gray-400">
									{stat.trend}
								</span>
							</div>
							<div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
								<div
									className={`h-full rounded-full ${stat.barColor} ${stat.barWidth}`}
								></div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Partners List Section */}
			<div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
				<h2 className="text-2xl font-bold text-[#1B1B1B]">
					Shopping & Partners Brand List
				</h2>
				<button
					onClick={() => setIsModalOpen(true)}
					className="bg-[#6A6D57] hover:bg-[#585a48] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-colors shadow-sm"
				>
					Add Partner
				</button>
			</div>

			<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
				{/* Tabs */}
				<div className="flex items-center gap-8 px-6 border-b border-gray-200">
					{["All Partners", "Active", "Pending", "Inactive"].map(
						(tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`py-4 text-sm font-semibold border-b-2 transition-colors ${
									activeTab === tab
										? "border-blue-600 text-blue-600"
										: "border-transparent text-gray-500 hover:text-gray-700"
								}`}
							>
								{tab}
							</button>
						)
					)}
				</div>

				{/* Filters */}
				<div className="p-4 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-100">
					<div className="relative w-full md:w-80">
						<Search
							className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
							size={18}
						/>
						<input
							type="text"
							placeholder="Search partners..."
							className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57]"
						/>
					</div>
					<div className="flex items-center gap-3 w-full md:w-auto">
						<button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
							<Filter size={16} />
							Filter
						</button>
						<div className="relative">
							<button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
								Sort by Name
								<ChevronDown size={16} />
							</button>
						</div>
					</div>
				</div>

				{/* Table */}
				<div className="overflow-x-auto">
					<table className="w-full text-left border-collapse">
						<thead className="bg-[#F9FAFB] text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
							<tr>
								<th className="px-6 py-4">Partner</th>
								<th className="px-6 py-4">Category</th>
								<th className="px-6 py-4">Products</th>
								<th className="px-6 py-4">Commission Rate</th>
								<th className="px-6 py-4">Revenue</th>
								<th className="px-6 py-4">Conversion</th>
								<th className="px-6 py-4">Status</th>
								<th className="px-6 py-4 text-right">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{partners.map((partner, index) => (
								<tr
									key={index}
									className="hover:bg-gray-50 transition-colors group"
								>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm">
												{partner.initial}
											</div>
											<div>
												<div className="font-bold text-[#1B1B1B] text-sm">
													{partner.name}
												</div>
												<div className="text-xs text-gray-400">
													ID: {partner.id}
												</div>
											</div>
										</div>
									</td>
									<td className="px-6 py-4 text-sm text-gray-600 font-medium">
										{partner.category}
									</td>
									<td className="px-6 py-4 text-sm text-gray-600 font-medium">
										{partner.products}
									</td>
									<td className="px-6 py-4 text-sm text-gray-600 font-bold">
										{partner.commission}
									</td>
									<td className="px-6 py-4 text-sm text-gray-600 font-medium">
										{partner.revenue}
									</td>
									<td className="px-6 py-4 text-sm text-gray-600 font-medium">
										{partner.conversion}
									</td>
									<td className="px-6 py-4">
										<span
											className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
												partner.status
											)}`}
										>
											{partner.status}
										</span>
									</td>
									<td className="px-6 py-4 text-right">
										<button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
											<MoreVertical size={16} />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Pagination */}
				<div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
					<p className="text-sm text-gray-500">
						Showing 1 to 8 of 8 results
					</p>
					<div className="flex items-center gap-2">
						<button className="px-3 py-1 border border-gray-200 rounded text-gray-500 hover:bg-gray-50 disabled:opacity-50 text-sm">
							{"<"}
						</button>
						<button className="px-3 py-1 bg-blue-50 border border-blue-100 text-blue-600 rounded text-sm font-semibold">
							1
						</button>
						<button className="px-3 py-1 border border-gray-200 rounded text-gray-500 hover:bg-gray-50 text-sm">
							2
						</button>
						<button className="px-3 py-1 border border-gray-200 rounded text-gray-500 hover:bg-gray-50 text-sm">
							{">"}
						</button>
					</div>
				</div>
			</div>

			{/* Add Partner Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
					<div className="bg-white rounded-xl shadow-xl w-full max-w-[800px] overflow-hidden">
						{/* Modal Header */}
						<div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
							<h2 className="text-xl font-bold text-[#1B1B1B]">
								Add New Partner
							</h2>
						</div>

						{/* Modal Body */}
						<div className="p-8">
							<form className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{/* Partner Name */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Partner Name
										</label>
										<input
											type="text"
											placeholder="Enter name"
											className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57]"
										/>
									</div>

									{/* Category */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Category
										</label>
										<div className="relative">
											<select className="appearance-none w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57] bg-white">
												<option value="">
													Choose category
												</option>
												<option value="fashion">
													Fashion
												</option>
												<option value="retail">
													Retail
												</option>
											</select>
											<ChevronDown
												className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"
												size={16}
											/>
										</div>
									</div>

									{/* Commission Rate */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Commission Rate (%)
										</label>
										<input
											type="text"
											placeholder="e.g. 7%"
											className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57]"
										/>
									</div>

									{/* Website */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Website
										</label>
										<input
											type="text"
											placeholder="https://example.com"
											className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57]"
										/>
									</div>

									{/* Email Address */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Email Address
										</label>
										<input
											type="email"
											placeholder="Enter email address"
											className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57]"
										/>
									</div>

									{/* Phone Number */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Phone Number
										</label>
										<input
											type="tel"
											placeholder="Enter phone number"
											className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57]"
										/>
									</div>
								</div>
							</form>
						</div>

						{/* Modal Footer */}
						<div className="px-8 py-6 flex justify-end gap-3">
							<button
								onClick={() => setIsModalOpen(false)}
								className="px-6 py-2.5 border border-red-200 text-red-500 font-semibold rounded-lg hover:bg-red-50 transition-colors"
							>
								Cancel
							</button>
							<button className="px-6 py-2.5 bg-[#6A6D57] hover:bg-[#585a48] text-white font-bold rounded-lg transition-colors">
								Add Partner
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default BrandPartners;
