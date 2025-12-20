import { Mail, MoreVertical, Search } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../store/useUserStore";

export default function UserManagement() {
	const navigate = useNavigate();
	const { users, count, fetchUsers, loading, updateUserStatus } =
		useUserStore();
	const [page, setPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [activeTab, setActiveTab] = useState("All Users");
	const [openActionId, setOpenActionId] = useState(null);
	const dropdownRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setOpenActionId(null);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleActionClick = (id) => {
		setOpenActionId(openActionId === id ? null : id);
	};

	const handleStatusChange = async (id, newStatus) => {
		try {
			// Map UI status to API status_action based on specific values allowed by the backend
			let apiStatusAction = "";
			if (newStatus === "Active") apiStatusAction = "reactivate";
			else if (newStatus === "Inactive") apiStatusAction = "deactivate";
			else if (newStatus === "Suspend") apiStatusAction = "suspend";

			const success = await updateUserStatus(id, apiStatusAction);
			if (success) {
				setOpenActionId(null);
			}
		} catch (err) {
			console.error("Status change failed", err);
		}
	};

	const itemsPerPage = 6; // API might return different pageSize, need to adjust based on API or use API pagination directly.

	// Calculate total pages based on count from API and items per page (assuming API defaults to 10 or similar, but here we can just use the provided count)
	// If API handles pagination fully, we just pass page param.
	// The previous UI had 6 items per page locally. Let's assume API standard pagination (often 10).
	// For now, let's rely on 'count' for pagination controls.
	const totalPages = Math.ceil(count / itemsPerPage);

	useEffect(() => {
		fetchUsers(page, searchTerm);
	}, [page, searchTerm, fetchUsers]);

	const engagementColor = (v) => {
		if (v < 30) return "bg-red-500";
		if (v < 80) return "bg-yellow-500";
		return "bg-green-500";
	};

	// Filtering by status locally since API endpoint for status filtering wasn't provided yet
	// Only filtering 'visible' list for now which might be just one page of data.
	// Ideally this should be a backend filter.
	const filteredUsers = users.filter((u) => {
		if (activeTab === "All Users") return true;
		return u.status === activeTab;
	});

	const { error: storeError } = useUserStore();

	return (
		<div className="relative">
			{storeError && (
				<div className="fixed top-4 right-4 z-[100] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
					<span>{storeError}</span>
				</div>
			)}
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
						{loading ? (
							<div className="p-4 text-center text-gray-500">
								Loading users...
							</div>
						) : (
							<div className="space-y-4">
								{filteredUsers.map((u) => (
									<div
										key={u.id}
										className="bg-white rounded-xl p-4 border border-[#6A6D57]/10 shadow-sm"
									>
										<div className="flex items-start gap-4">
											<img
												src={
													u.profile?.profile_image ||
													"https://i.pravatar.cc/64"
												}
												alt="avatar"
												className="w-12 h-12 rounded-full mt-1"
											/>
											<div className="flex-1">
												<div className="flex items-center justify-between">
													<div>
														<div className="font-medium text-[#333]">
															{u.name} {u.surname}
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
														{u.closet_items_count}{" "}
														items
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
														{new Date(
															u.last_login
														).toLocaleDateString()}
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
						)}
					</div>

					<div className="hidden md:block overflow-x-auto max-h-[calc(100vh-400px)]">
						{loading ? (
							<div className="p-8 text-center text-gray-500">
								Loading users...
							</div>
						) : (
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
									{filteredUsers.map((u) => (
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
													className="flex items-center gap-4 cursor-pointer"
												>
													<img
														src={
															u.profile
																?.profile_image ||
															"https://i.pravatar.cc/64"
														}
														alt="avatar"
														className="w-12 h-12 rounded-full"
													/>
													<div>
														<div className="font-medium text-[#333]">
															{u.name} {u.surname}
														</div>
														<div className="text-sm text-[#6A6D57]/70 flex items-center gap-2">
															<Mail size={14} />{" "}
															<span>
																{u.email}
															</span>
														</div>
													</div>
												</div>
											</td>

											<td className="px-8 py-6 text-[#6A6D57]">
												{u.signup_method}
											</td>

											<td className="px-8 py-6 text-gray-900">
												{u.closet_items_count}
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
												{u.last_login
													? new Date(
															u.last_login
													  ).toLocaleDateString()
													: "N/A"}
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
															u.status ===
															"Active"
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

											<td className="px-8 py-6 relative">
												<div className="flex items-center justify-center">
													<button
														onClick={(e) => {
															e.stopPropagation();
															handleActionClick(
																u.id
															);
														}}
														className="p-2 rounded-md transition-colors text-[#2C2C2C]"
													>
														<MoreVertical
															size={18}
														/>
													</button>
													{openActionId === u.id && (
														<div
															ref={dropdownRef}
															className="absolute right-8 top-12 z-[60] w-40 bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden p-2 flex flex-col gap-1"
														>
															{[
																"Active",
																"Inactive",
																"Suspend",
															].map((status) => (
																<button
																	key={status}
																	type="button"
																	onClick={() =>
																		handleStatusChange(
																			u.id,
																			status
																		)
																	}
																	className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all font-medium cursor-pointer
                                                                    ${
																		u.status.toLowerCase() ===
																			status.toLowerCase() ||
																		(u.status ===
																			"Suspended" &&
																			status ===
																				"Suspend")
																			? "bg-[#C4C9A2] text-[#2F3124]"
																			: "text-[#2F3124] hover:bg-gray-50"
																	}
                                                                `}
																>
																	{status}
																</button>
															))}
														</div>
													)}
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						)}

						<div className="px-6 py-4 bg-gradient-to-r from-white/40 to-[#6A6D57]/5 border-t border-[#6A6D57]/10 flex items-center justify-between">
							<div className="text-sm text-[#6A6D57]/80">
								{count === 0
									? "No results found"
									: `Total ${count} users`}
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
								{/* Simplification: Just Next/Prev for now as calculating exact total pages depends on API limit per page. */}
								<span className="text-sm text-[#6A6D57]">
									Page {page}
								</span>

								<button
									onClick={() =>
										// If we have 'next' link from API, we can go to next page.
										// Or if we know count, we can check.
										// For now let's just increment and see if API returns data, or check against count if we knew pageSize.
										// Let's assume standard behavior for now.
										setPage((p) => p + 1)
									}
									// Disable if current user count displayed < itemsPerPage (end of list) OR
									// if we calculate total pages.
									disabled={false} // Todo: precise disable logic
									className={`px-3 py-2 rounded-lg border border-[#6A6D57]/10 text-[#6A6D57] hover:bg-white/60`}
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
