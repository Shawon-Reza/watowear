import { Mail, MoreVertical, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const SAMPLE_USERS = [
	{
		id: 1,
		image: "https://i.pravatar.cc/64?img=11",
		name: "Emma Johnson",
		email: "emma.j@example.com",
		signup_method: "Email",
		status: "Active",
		closet_amount: 128,
		last_active: "2 hours ago",
		engagement: 92,
	},
	{
		id: 2,
		image: "https://i.pravatar.cc/64?img=12",
		name: "Michael Chen",
		email: "michael.c@example.com",
		signup_method: "Google",
		status: "Active",
		closet_amount: 75,
		last_active: "1 day ago",
		engagement: 78,
	},
	{
		id: 3,
		image: "https://i.pravatar.cc/64?img=13",
		name: "Sophia Rodriguez",
		email: "sophia.r@example.com",
		signup_method: "Apple",
		status: "Active",
		closet_amount: 210,
		last_active: "3 days ago",
		engagement: 85,
	},
	{
		id: 4,
		image: "https://i.pravatar.cc/64?img=14",
		name: "James Wilson",
		email: "james.w@example.com",
		signup_method: "Email",
		status: "Inactive",
		closet_amount: 42,
		last_active: "2 months ago",
		engagement: 23,
	},
	{
		id: 5,
		image: "https://i.pravatar.cc/64?img=15",
		name: "Olivia Martinez",
		email: "olivia.m@example.com",
		signup_method: "Google",
		status: "Suspended",
		closet_amount: 156,
		last_active: "1 week ago",
		engagement: 65,
	},
	{
		id: 6,
		image: "https://i.pravatar.cc/64?img=16",
		name: "Noah Brown",
		email: "noah.b@example.com",
		signup_method: "Google",
		status: "Active",
		closet_amount: 89,
		last_active: "5 hours ago",
		engagement: 88,
	},
];

export default function UserManagement() {
	const [users, setUsers] = useState(SAMPLE_USERS);
	const [searchTerm, setSearchTerm] = useState("");
	const [activeTab, setActiveTab] = useState("All Users");
	const [page, setPage] = useState(1);
	const navigate = useNavigate();
	const itemsPerPage = 6;

	const filtered = useMemo(() => {
		const q = searchTerm.trim().toLowerCase();
		return users.filter((u) => {
			const matchesQuery =
				!q ||
				u.name.toLowerCase().includes(q) ||
				u.email.toLowerCase().includes(q);
			const matchesTab =
				activeTab === "All Users" ? true : u.status === activeTab;
			return matchesQuery && matchesTab;
		});
	}, [users, searchTerm, activeTab]);

	const totalItems = filtered.length;
	const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
	const visible = filtered.slice(
		(page - 1) * itemsPerPage,
		page * itemsPerPage
	);

	// Keep page in range when filters change
	if (page > totalPages) setPage(1);

	const engagementColor = (v) => {
		if (v < 30) return "bg-red-500";
		if (v < 80) return "bg-yellow-500";
		return "bg-green-500";
	};

	const toggleStatus = (id) => {
		setUsers((prev) =>
			prev.map((u) =>
				u.id === id
					? {
							...u,
							status:
								u.status === "Active" ? "Inactive" : "Active",
					  }
					: u
			)
		);
	};

	const deleteUser = (id) =>
		setUsers((prev) => prev.filter((u) => u.id !== id));

	return (
		<div className="">
			<div className="mx-auto space-y-6">
				<div>
					<h1 className="text-3xl font-bold text-[#222]">
						User Management
					</h1>
				</div>

				<div className="bg-white/70 rounded-xl p-3 border border-[#6A6D57]/10">
					<div className="flex items-center gap-4">
						{["All Users", "Active", "Inactive", "Suspended"].map(
							(tab) => (
								<button
									key={tab}
									onClick={() => {
										setActiveTab(tab);
										setPage(1);
									}}
									className={`px-4 py-2 text-sm rounded-md font-medium ${
										activeTab === tab
											? "border-b-2 border-[#6A6D57] text-[#123]"
											: "text-[#6A6D57] hover:bg-white/60"
									}`}
								>
									{tab}
								</button>
							)
						)}
					</div>
				</div>

				<div className="bg-white/70 rounded-3xl border border-[#6A6D57]/10 shadow-md overflow-hidden">
					<div className="p-6 border-b border-[#6A6D57]/10 flex items-center justify-between gap-4">
						<div className="relative w-full md:max-w-md">
							<Search
								className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6A6D57]/60"
								size={18}
							/>
							<input
								type="text"
								placeholder="Search users by name or email..."
								value={searchTerm}
								onChange={(e) => {
									setSearchTerm(e.target.value);
									setPage(1);
								}}
								className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/60 border border-[#6A6D57]/20 text-[#6A6D57]"
							/>
						</div>
					</div>

					<div className="md:hidden px-4 py-3">
						{/* Mobile stacked cards */}
						<div className="space-y-4">
							{visible.map((u) => (
								<div
									key={u.id}
									className="bg-white rounded-xl p-4 border border-[#6A6D57]/10 shadow-sm"
								>
									<div className="flex items-start gap-4">
										<img
											src={u.image}
											alt="avatar"
											className="w-12 h-12 rounded-full mt-1"
										/>
										<div className="flex-1">
											<div className="flex items-center justify-between">
												<div>
													<div className="font-medium text-[#333]">
														{u.name}
													</div>
													<div className="text-sm text-[#6A6D57]/70">
														{u.email}
													</div>
												</div>
												<div className="text-sm text-[#6A6D57]">
													{u.signup_method}
												</div>
											</div>

											<div className="mt-3 flex items-center justify-between gap-4">
												<div className="text-sm text-gray-900">
													{u.closet_amount} items
												</div>
												<div className="flex items-center gap-3">
													<div
														className={`w-28 h-2.5 rounded-full bg-gray-200 overflow-hidden`}
													>
														<div
															className={`${engagementColor(
																u.engagement
															)} h-full rounded-full`}
															style={{
																width: `${u.engagement}%`,
															}}
														/>
													</div>
													<div className="text-sm text-gray-900">
														{u.engagement}%
													</div>
												</div>
											</div>

											<div className="mt-3 flex items-center justify-between">
												<div className="text-sm text-[#6A6D57]/80">
													{u.last_active}
												</div>
												<div>
													<span
														className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
															u.status ===
															"Active"
																? "bg-green-100 text-green-700"
																: u.status ===
																  "Inactive"
																? "bg-gray-100 text-gray-700"
																: "bg-red-100 text-red-700"
														}`}
													>
														{u.status}
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="hidden md:block overflow-x-auto max-h-[calc(100vh-400px)]">
						<table className="w-full min-w-[900px]">
							<thead className="bg-gradient-to-r from-[#F4F1EB] to-white">
								<tr className="border-b border-[#6A6D57]/10">
									<th className="px-8 py-6 text-left text-sm font-bold text-[#6A6D57]">
										User
									</th>
									<th className="px-8 py-6 text-left text-sm font-bold text-[#6A6D57]">
										Signup Method
									</th>
									<th className="px-8 py-6 text-left text-sm font-bold text-[#6A6D57]">
										Closet Items
									</th>
									<th className="px-8 py-6 text-left text-sm font-bold text-[#6A6D57]">
										Engagement
									</th>
									<th className="px-8 py-6 text-left text-sm font-bold text-[#6A6D57]">
										Last Login
									</th>
									<th className="px-8 py-6 text-left text-sm font-bold text-[#6A6D57]">
										Status
									</th>
									<th className="px-8 py-6 text-center text-sm font-bold text-[#6A6D57]">
										Actions
									</th>
								</tr>
							</thead>

							<tbody className="divide-y divide-[#6A6D57]/10">
								{visible.map((u) => (
									<tr
										key={u.id}
										className="group hover:bg-[#f8fbf8] transition-all"
									>
										<td className="px-8 py-6">
											<div
												onClick={() => {
													navigate(
														`user_profile/${u.id}`
													);
												}}
												className="flex items-center gap-4"
											>
												<img
													src={u.image}
													alt="avatar"
													className="w-12 h-12 rounded-full"
												/>
												<div>
													<div className="font-medium text-[#333]">
														{u.name}
													</div>
													<div className="text-sm text-[#6A6D57]/70 flex items-center gap-2">
														<Mail size={14} />{" "}
														<span>{u.email}</span>
													</div>
												</div>
											</div>
										</td>

										<td className="px-8 py-6 text-[#6A6D57]">
											{u.signup_method}
										</td>

										<td className="px-8 py-6 text-gray-900">
											{u.closet_amount}
										</td>

										<td className="px-8 py-6">
											<div className="w-44 h-[10px] rounded-full bg-gray-200 overflow-hidden inline-block align-middle">
												<div
													className={`${engagementColor(
														u.engagement
													)} h-full rounded-full`}
													style={{
														width: `${u.engagement}%`,
													}}
												/>
											</div>
											<span className="ml-2 text-sm font-medium text-gray-900">
												{u.engagement}%
											</span>
										</td>

										<td className="px-8 py-6 text-gray-900">
											{u.last_active}
										</td>

										<td className="px-8 py-6">
											<span
												className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold shadow-sm ${
													u.status === "Active"
														? "bg-gradient-to-r from-green-100 to-emerald-200 text-green-700"
														: u.status ===
														  "Inactive"
														? "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700"
														: "bg-gradient-to-r from-red-100 to-red-200 text-red-700"
												}`}
											>
												<div
													className={`w-2 h-2 rounded-full mr-2 ${
														u.status === "Active"
															? "bg-green-500"
															: u.status ===
															  "Inactive"
															? "bg-gray-500"
															: "bg-red-500"
													}`}
												/>
												{u.status}
											</span>
										</td>

										<td className="px-8 py-6">
											<div className="flex items-center justify-center">
												<button className="p-2 rounded-md hover:bg-gray-100">
													<MoreVertical size={18} />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>

						<div className="px-6 py-4 bg-gradient-to-r from-white/40 to-[#6A6D57]/5 border-t border-[#6A6D57]/10 flex items-center justify-between">
							<div className="text-sm text-[#6A6D57]/80">
								{totalItems === 0 ? (
									"Showing 0 to 0 of 0 result"
								) : (
									<>
										Showing {(page - 1) * itemsPerPage + 1}{" "}
										to{" "}
										{Math.min(
											page * itemsPerPage,
											totalItems
										)}{" "}
										of {totalItems} result
										{totalItems > 1 ? "s" : ""}
									</>
								)}
							</div>

							<div className="flex items-center gap-2">
								<button
									onClick={() =>
										setPage((p) => Math.max(1, p - 1))
									}
									disabled={page === 1}
									className={`px-3 py-2 rounded-lg border border-[#6A6D57]/10 text-[#6A6D57] ${
										page === 1
											? "opacity-50 cursor-not-allowed"
											: "hover:bg-white/60"
									}`}
								>
									&lt;
								</button>

								<div className="flex items-center gap-2">
									{Array.from(
										{ length: totalPages },
										(_, i) => i + 1
									).map((p) => (
										<button
											key={p}
											onClick={() => setPage(p)}
											className={`w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium transition ${
												p === page
													? "bg-[#CDEDD6] text-[#1f6f45] shadow"
													: "bg-white/70 text-[#6A6D57] hover:bg-white/90"
											}`}
										>
											{p}
										</button>
									))}
								</div>

								<button
									onClick={() =>
										setPage((p) =>
											Math.min(totalPages, p + 1)
										)
									}
									disabled={page === totalPages}
									className={`px-3 py-2 rounded-lg border border-[#6A6D57]/10 text-[#6A6D57] ${
										page === totalPages
											? "opacity-50 cursor-not-allowed"
											: "hover:bg-white/60"
									}`}
								>
									&gt;
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
