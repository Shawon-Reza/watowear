import { useEffect, useMemo, useState } from "react";
import { FaCheck, FaChevronDown, FaUserGroup } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineEmail, MdOutlineWatchLater } from "react-icons/md";
import axiosClient from "../../../api/axiosClient";
import useSupportStore from "../../../store/useSupportStore";
import SupportReplyModal from "./SupportReplyModal";

export default function Support() {
	const {
		tickets,
		count,
		loading,
		error,
		fetchTickets,
		updateTicketStatus,
		sendTicketReply,
	} = useSupportStore();

	const [tab, setTab] = useState("All");
	const [page, setPage] = useState(1);
	const [pageSize] = useState(8);
	const [archived, setArchived] = useState(false);
	const [actionOpenId, setActionOpenId] = useState(null);
	const [replyModalOpen, setReplyModalOpen] = useState(false);
	const [activeSupportItem, setActiveSupportItem] = useState(null);

	// fetch data whenever filters change
	useEffect(() => {
		fetchTickets(page, tab === "Archived" ? "read" : "");
	}, [tab, page, fetchTickets]);

	// close action dropdown when clicking outside
	useEffect(() => {
		function handleDocClick(e) {
			// if click is not inside a dropdown or a button with data-action-id, close
			if (
				!e.target.closest(".action-dropdown") &&
				!e.target.closest("[data-action-button]")
			) {
				setActionOpenId(null);
			}
		}
		document.addEventListener("click", handleDocClick);
		return () => document.removeEventListener("click", handleDocClick);
	}, []);

	const pageCount = Math.max(1, Math.ceil(count / pageSize));

	const totalSubmitted = count;
	const recentSubmitted = tickets.filter((s) => {
		const d = new Date(s.created_at);
		return Date.now() - d.getTime() < 30 * 24 * 60 * 60 * 1000;
	}).length;

	const readCount = tickets.filter((s) => s.status === "read").length;
	const unreadCount = tickets.filter((s) => s.status === "unread").length;
	const repliedCount = tickets.filter((s) => s.status === "replied").length;

	async function handleToggleStatus(id, currentStatus) {
		const newStatus = currentStatus === "unread" ? "read" : "unread";
		await updateTicketStatus(id, newStatus);
	}

	function handleFetchMore() {
		if (page < pageCount) setPage((p) => p + 1);
	}

	async function handleSendReply({ id, reply }) {
		const result = await sendTicketReply(id, reply);
		if (result.success) {
			alert("Reply sent successfully!");
			setReplyModalOpen(false);
		} else {
			alert(result.error);
		}
	}

	return (
		<div>
			<h2 className="text-2xl font-semibold text-gray-800  mb-4">
				Support
			</h2>

			{/* Top cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
				<div className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-5">
					<div className="bg-[#3B82F6] p-3 rounded-md">
						<FaUserGroup color="" className="text-white" />
					</div>
					<div>
						<div className="text-sm text-gray-500">
							Total Support Submitted
						</div>
						<div className="text-lg font-semibold text-black">
							{totalSubmitted}
						</div>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-5">
					<div className="bg-[#6A6D57] p-3 rounded-md">
						<FaCheck color="" className="text-white" />
					</div>
					<div>
						<div className="text-sm text-gray-500">
							Recent Submitted
						</div>
						<div className="text-lg font-semibold text-black">
							{recentSubmitted}
						</div>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-5">
					<div className="bg-[#f63b3b] p-3 rounded-md flex items-center justify-center">
						<MdOutlineEmail
							size={18}
							color=""
							className="text-black "
						/>
					</div>
					<div>
						<div className="text-sm text-gray-500">Read</div>
						<div className="text-lg font-semibold text-green-600">
							{readCount}{" "}
							<span className="text-sm text-black">
								/ Unread {unreadCount}
							</span>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-5">
					<div className="bg-[#EAB308] p-3 rounded-md">
						<MdOutlineWatchLater
							size={18}
							color=""
							className="text-black"
						/>
					</div>
					<div>
						<div className="text-sm text-gray-500">This Month</div>
						<div className="text-lg font-semibold text-black">
							0
						</div>
					</div>
				</div>
			</div>

			{/* Filters and tabs */}
			<div className="p-4">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
					<div className="flex items-center gap-3">
						{["All", "Archived"].map((t) => (
							<button
								key={t}
								onClick={() => {
									setTab(t === "All" ? "All" : "Archived");
									setArchived(t === "Archived");
									setPage(1);
								}}
								className={`px-3 py-3 ${
									tab === t
										? "border-b-2 border-[#6A6D57] text-gray-900"
										: "text-gray-600"
								}`}
							>
								{t}
							</button>
						))}
					</div>

					<div className="flex items-center gap-3">
						{/* Only tab and pagination are needed per request; no search or sort controls */}
						<div className="text-sm text-gray-500">
							Showing support list
						</div>
					</div>
				</div>
			</div>

			{/* Table */}
			<div className="bg-white rounded-lg shadow-sm overflow-hidden">
				<div className="p-4 overflow-x-auto">
					<table className="min-w-full text-left text-sm">
						<thead>
							<tr className="text-gray-500">
								<th className="py-3 px-4">
									Support email list
								</th>
								<th className="py-3 px-4">Subject of Issue</th>
								<th className="py-3 px-4">Message</th>
								<th className="py-3 px-4">Photos</th>
								<th className="py-3 px-4">Submitted Date</th>
								<th className="py-3 px-4">Status</th>
								<th className="py-3 px-4">Action</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<tr>
									<td
										colSpan={7}
										className="py-6 px-4 text-center"
									>
										Loading...
									</td>
								</tr>
							) : tickets.length === 0 ? (
								<tr>
									<td
										colSpan={7}
										className="py-6 px-4 text-center text-[#111827]"
									>
										No results
									</td>
								</tr>
							) : (
								tickets.map((s) => (
									<tr key={s.id} className="border-t">
										<td className="py-4 px-4 align-middle text-[#111827]">
											{s.user_email}
										</td>
										<td className="py-4 px-4 text-[#6B7280]">
											{s.subject}
										</td>
										<td className="py-4 px-4 text-gray-600">
											{s.message}
										</td>
										<td className="py-4 px-4">
											{s.photo ? (
												<button
													onClick={() =>
														window.open(
															s.photo.startsWith(
																"http"
															)
																? s.photo
																: axiosClient
																		.defaults
																		.baseURL +
																		s.photo,
															"_blank"
														)
													}
													className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded"
												>
													View photo
												</button>
											) : (
												<span className="text-xs text-gray-400">
													—
												</span>
											)}
										</td>
										<td className="py-4 px-4 text-[#6B7280]">
											{new Date(
												s.created_at
											).toLocaleDateString()}
										</td>
										<td className="py-4 px-4">
											<button
												onClick={() =>
													handleToggleStatus(
														s.id,
														s.status
													)
												}
												className={`px-3 py-1 rounded text-sm flex flex-row items-center justify-center capitalize ${
													s.status === "read"
														? "bg-[#22C55E] text-white"
														: s.status === "replied"
														? "bg-blue-500 text-white"
														: "bg-[#FF6361] text-white"
												}`}
											>
												{s.status}
												<FaChevronDown className="ml-1" />
											</button>
										</td>
										<td className="py-4 px-4 relative">
											<button
												data-action-button
												onClick={(e) => {
													e.stopPropagation();
													setActionOpenId(
														actionOpenId === s.id
															? null
															: s.id
													);
												}}
												className="p-1 rounded hover:bg-gray-100"
											>
												<HiDotsVertical className="w-5 h-5 text-gray-500" />
											</button>

											{actionOpenId === s.id && (
												<div className="action-dropdown absolute right-2 top-8 z-10 bg-white border rounded shadow-md w-36 py-1">
													<button
														onClick={() => {
															setActiveSupportItem(
																s
															);
															setReplyModalOpen(
																true
															);
															setActionOpenId(
																null
															);
														}}
														className="w-full text-left px-3 py-2 text-black hover:bg-[#C2C7A3]"
													>
														Reply
													</button>
													<button
														onClick={() => {
															updateTicketStatus(
																s.id,
																"read"
															);
															setActionOpenId(
																null
															);
														}}
														className="w-full text-left px-3 py-2 text-black hover:bg-[#FEE2E2]"
													>
														Archived
													</button>
												</div>
											)}
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				{/* Footer / pagination */}
				<div className="px-4 py-3 flex items-center justify-between text-sm text-gray-600">
					<div>
						Showing {tickets.length ? (page - 1) * pageSize + 1 : 0}{" "}
						to {Math.min(count, page * pageSize)} of {count} result
						{count !== 1 ? "s" : ""}
					</div>

					<div className="flex items-center gap-2">
						<button
							onClick={() => setPage((p) => Math.max(1, p - 1))}
							disabled={page === 1}
							className="px-3 py-1 border rounded"
						>
							&lt;
						</button>
						{Array.from({ length: pageCount }).map((_, i) => (
							<button
								key={i}
								onClick={() => setPage(i + 1)}
								className={`px-3 py-1 border rounded ${
									page === i + 1 ? "bg-green-100" : ""
								}`}
							>
								{i + 1}
							</button>
						))}
						<button
							onClick={() =>
								setPage((p) => Math.min(pageCount, p + 1))
							}
							disabled={page === pageCount}
							className="px-3 py-1 border rounded"
						>
							&gt;
						</button>
					</div>
				</div>
			</div>

			{/* Reply modal - opens when replyModalOpen is true */}
			<SupportReplyModal
				open={replyModalOpen}
				supportItem={activeSupportItem}
				onClose={() => setReplyModalOpen(false)}
				onSend={(payload) => {
					handleSendReply(payload);
				}}
			/>
		</div>
	);
}
