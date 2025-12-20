import { useCallback, useEffect, useRef, useState } from "react";
import useClosetStore from "../../../store/useClosetStore";

const DEFAULT_PAGE_SIZE = 10;

const ClosetManagementTable = () => {
	const {
		items,
		count: total,
		loading,
		error,
		fetchClosetItems,
	} = useClosetStore();
	const [page, setPage] = useState(1);
	const [pageSize] = useState(DEFAULT_PAGE_SIZE);

	// Filters
	const [filters, setFilters] = useState({
		status: "all",
		category: "all",
		search: "",
	});

	// Fetch items when page or filters change
	useEffect(() => {
		fetchClosetItems(
			page,
			filters.search,
			filters.status,
			filters.category
		);
	}, [page, filters, fetchClosetItems]);

	// Handler helpers
	const handleFilterChange = (key, value) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
		setPage(1);
	};

	const handlePageChange = (newPage) => {
		if (newPage < 1) return;
		const totalPages = Math.max(1, Math.ceil(total / pageSize));
		if (newPage > totalPages) return;
		setPage(newPage);
	};

	const totalPages = Math.max(1, Math.ceil(total / pageSize));

	// Small reusable action menu component for each row
	const ActionMenu = ({ item }) => {
		const [open, setOpen] = useState(false);
		const ref = useRef(null);

		useEffect(() => {
			function handleDocClick(e) {
				if (ref.current && !ref.current.contains(e.target))
					setOpen(false);
			}
			document.addEventListener("click", handleDocClick);
			return () => document.removeEventListener("click", handleDocClick);
		}, []);

		const handleView = () => {
			setOpen(false);
		};
		const handleEdit = () => {
			setOpen(false);
		};
		const handleArchiveAction = () => {
			// handleArchive(item.id);
			setOpen(false);
		};

		return (
			<div className="relative inline-block" ref={ref}>
				<button
					onClick={(e) => {
						e.stopPropagation();
						setOpen((s) => !s);
					}}
					className="p-1 rounded hover:bg-gray-100"
					aria-haspopup="true"
					aria-expanded={open}
				>
					<span className="text-lg">⋮</span>
				</button>

				{open && (
					<div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow z-50">
						<button
							onClick={handleView}
							className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
						>
							View
						</button>
						<button
							onClick={handleEdit}
							className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
						>
							Edit
						</button>
						<button
							onClick={handleArchiveAction}
							className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-50"
						>
							Archive
						</button>
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="bg-white rounded-md shadow-sm p-4 sm:p-6">
			{/* Header Actions */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
				<div className="flex items-center gap-3">
					<div className="text-sm font-semibold text-[#6A6D57] border-b-2 border-[#6A6D57] pb-1 cursor-pointer">
						All Items
					</div>
				</div>

				<div className="relative">
					<select
						className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-8 rounded-lg text-sm focus:outline-none focus:border-[#6A6D57] cursor-pointer"
						defaultValue="date"
					>
						<option value="date">Sort by Date</option>
						<option value="name">Sort by Name</option>
						<option value="status">Sort by Status</option>
					</select>
					<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
						<svg
							className="h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</div>
				</div>
			</div>

			{/* Mobile cards */}
			<div className="md:hidden space-y-3">
				{loading ? (
					<div className="text-sm text-gray-500 text-center py-4">
						Loading...
					</div>
				) : error ? (
					<div className="text-sm text-red-500 text-center py-4">
						{error}
					</div>
				) : items.length === 0 ? (
					<div className="text-sm text-gray-600 text-center py-4">
						No items found
					</div>
				) : (
					items.map((it) => (
						<div
							key={it.id}
							className="p-3 bg-gray-50 rounded-md flex items-start justify-between"
						>
							<div className="flex gap-3">
								<img
									src={it.image_url}
									alt={it.subcategory}
									className="h-12 w-12 object-cover rounded bg-gray-100 flex-shrink-0"
								/>
								<div>
									<div className="text-sm font-semibold text-gray-800">
										{it.subcategory}
									</div>
									<div className="text-xs text-gray-500">
										{it.category} •{" "}
										{it.uploaded_by || "System"}
									</div>
									<div className="mt-1 flex flex-wrap gap-1">
										{it.tags &&
											it.tags.map((t, i) => (
												<span
													key={i}
													className="inline-block bg-white text-gray-600 px-2 py-0.5 rounded-full border border-gray-100 text-[10px]"
												>
													{t}
												</span>
											))}
									</div>
								</div>
							</div>
							<div className="text-right">
								<div className="text-[10px] text-gray-500 uppercase tracking-tight">
									{it.status}
								</div>
								<div className="mt-2">
									<ActionMenu item={it} />
								</div>
							</div>
						</div>
					))
				)}
			</div>

			{/* Desktop/tablet table */}
			<div className="hidden md:block">
				<div className="overflow-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="text-left text-xs text-gray-500 border-b border-gray-100">
								<th className="px-4 py-4 font-normal">Item</th>
								<th className="px-4 py-4 font-normal">
									Category
								</th>
								<th className="px-4 py-4 font-normal">Tags</th>
								<th className="px-4 py-4 font-normal">
									Uploaded By
								</th>
								<th className="px-4 py-4 font-normal">
									Status
								</th>
								<th className="px-4 py-4 font-normal">
									Date Added
								</th>
								<th className="px-4 py-4 font-normal text-right">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-50">
							{loading ? (
								<tr>
									<td
										colSpan={7}
										className="px-4 py-6 text-center text-gray-500"
									>
										Loading...
									</td>
								</tr>
							) : error ? (
								<tr>
									<td
										colSpan={7}
										className="px-4 py-6 text-center text-red-500"
									>
										{error}
									</td>
								</tr>
							) : items.length === 0 ? (
								<tr>
									<td
										colSpan={7}
										className="px-4 py-6 text-center text-gray-600"
									>
										No items found
									</td>
								</tr>
							) : (
								items.map((it) => (
									<tr
										key={it.id}
										className="hover:bg-gray-50"
									>
										<td className="px-4 py-4">
											<div className="flex items-center gap-3">
												<img
													src={it.image_url}
													alt={it.subcategory}
													className="h-10 w-10 object-cover rounded bg-gray-100 flex-shrink-0"
												/>
												<div className="font-medium text-gray-800 text-xs">
													{it.subcategory}
												</div>
											</div>
										</td>
										<td className="px-4 py-4 text-xs text-gray-600">
											{it.category}
										</td>
										<td className="px-4 py-4">
											<div className="flex flex-col gap-1">
												{it.tags &&
													it.tags.map((t, i) => (
														<span
															key={i}
															className="inline-block bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] w-fit"
														>
															{t}
														</span>
													))}
											</div>
										</td>
										<td className="px-4 py-4 text-xs text-gray-600">
											{it.uploaded_by || "System"}
										</td>
										<td className="px-4 py-4">
											<span
												className={`px-3 py-1 rounded-full text-[10px] font-medium border ${
													it.status.toLowerCase() ===
													"active"
														? "bg-green-50 text-green-600 border-green-100"
														: "bg-gray-100 text-gray-600 border-gray-200"
												}`}
											>
												{it.status}
											</span>
										</td>
										<td className="px-4 py-4 text-xs text-gray-500">
											{it.created_at
												? new Date(
														it.created_at
												  ).toLocaleDateString()
												: "N/A"}
										</td>
										<td className="px-4 py-4 text-right">
											<div className="flex items-center justify-end gap-2">
												<ActionMenu item={it} />
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* Pagination Footer */}
			<div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
				<div>
					Showing {items.length > 0 ? (page - 1) * pageSize + 1 : 0}{" "}
					to {Math.min(page * pageSize, total)} of {total} results
				</div>
				<div className="flex items-center gap-1 mt-4 sm:mt-0">
					<button
						onClick={() => handlePageChange(page - 1)}
						disabled={page === 1}
						className={`w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed`}
					>
						&lt;
					</button>

					{(() => {
						const maxButtons = 3;
						let start = page - 1;
						if (start < 1) start = 1;
						let end = start + maxButtons - 1;
						if (end > totalPages) {
							end = totalPages;
							start = Math.max(1, totalPages - maxButtons + 1);
						}

						const buttons = [];
						for (let p = start; p <= end; p++) {
							buttons.push(
								<button
									key={p}
									onClick={() => handlePageChange(p)}
									className={`w-8 h-8 flex items-center justify-center border rounded ${
										p === page
											? "bg-[#D4D89A] text-black border-[#D4D89A]"
											: "hover:bg-gray-50"
									}`}
								>
									{p}
								</button>
							);
						}
						return buttons;
					})()}

					<button
						onClick={() => handlePageChange(page + 1)}
						disabled={page === totalPages}
						className={`w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed`}
					>
						&gt;
					</button>
				</div>
			</div>
		</div>
	);
};

export default ClosetManagementTable;
