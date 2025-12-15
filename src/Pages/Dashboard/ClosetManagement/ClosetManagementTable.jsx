import { useCallback, useEffect, useRef, useState } from "react";

// Example shape expected from backend: { total: number, items: Array<ClosetItem> }
// ClosetItem: { id, title, category, tags: [], uploadedBy, status, dateAdded, thumbnail }

const SAMPLE_DATA = [
	{
		id: 1,
		title: "Blue Denim Jacket",
		category: "Outerwear",
		tags: ["Casual", "Denim", "Spring"],
		uploadedBy: "Emma Johnson",
		status: "Uploaded",
		dateAdded: "2023-10-15",
		thumbnail: "",
	},
	{
		id: 2,
		title: "Black Leather Boots",
		category: "Footwear",
		tags: ["Winter", "Leather", "Formal"],
		uploadedBy: "Michael Chen",
		status: "Uploaded",
		dateAdded: "2023-10-12",
		thumbnail: "",
	},
	{
		id: 3,
		title: "White Cotton T-Shirt",
		category: "Tops",
		tags: ["Basic", "Summer", "Casual"],
		uploadedBy: "Sophia Rodriguez",
		status: "Uploaded",
		dateAdded: "2023-10-10",
		thumbnail: "",
	},
	{
		id: 4,
		title: "Gray Wool Sweater",
		category: "Knitwear",
		tags: ["Winter", "Warm", "Comfort"],
		uploadedBy: "Daniel Carter",
		status: "Uploaded",
		dateAdded: "2023-09-29",
		thumbnail: "",
	},
	{
		id: 5,
		title: "Floral Maxi Dress",
		category: "Dresses",
		tags: ["Summer", "Floral", "Elegant"],
		uploadedBy: "Ava Patel",
		status: "Uploaded",
		dateAdded: "2023-10-08",
		thumbnail: "",
	},
	{
		id: 6,
		title: "Navy Chino Pants",
		category: "Bottoms",
		tags: ["Casual", "Smart", "Cotton"],
		uploadedBy: "Ethan Williams",
		status: "Uploaded",
		dateAdded: "2023-10-05",
		thumbnail: "",
	},
];

const DEFAULT_PAGE_SIZE = 10;

const ClosetManagementTable = () => {
	const [items, setItems] = useState([]);
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Filters passed to backend - extend as needed
	const [filters, setFilters] = useState({
		status: "all", // all, Uploaded, Archived
		category: "all",
		search: "",
	});

	// Build query params for API request
	const buildQuery = (params) =>
		Object.entries(params)
			.filter(
				([, v]) =>
					v !== undefined && v !== null && v !== "" && v !== "all"
			)
			.map(
				([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
			)
			.join("&");

	// Fetch function - expects backend endpoint that accepts page, pageSize and filter params
	const fetchClosetItems = useCallback(
		async ({
			pageNumber = page,
			size = pageSize,
			filters: f = filters,
		} = {}) => {
			setLoading(true);
			setError(null);

			const params = {
				page: pageNumber,
				pageSize: size,
				status: f.status,
				category: f.category,
				search: f.search,
			};

			// Console the outgoing query so you can verify values when integrating
			console.log(
				"[Closet] fetching page",
				pageNumber,
				"pageSize",
				size,
				"filters",
				f
			);

			const q = buildQuery(params);
			const url = `/api/closet${q ? `?${q}` : ""}`; // change to your real endpoint

			try {
				const controller = new AbortController();
				const signal = controller.signal;

				// NOTE: this fetch expects backend JSON shaped as { total, items }
				const res = await fetch(url, { method: "GET", signal });

				if (!res.ok) {
					// If backend is not available yet, fallback to SAMPLE_DATA and log the error
					throw new Error(`API responded with status ${res.status}`);
				}

				const data = await res.json();

				// Console the response for debugging/integration
				console.log("[Closet] API response", data);

				setItems(Array.isArray(data.items) ? data.items : []);
				setTotal(typeof data.total === "number" ? data.total : 0);
			} catch (err) {
				console.warn(
					"[Closet] fetch error, using SAMPLE_DATA fallback:",
					err.message
				);
				// Fallback: simulate pagination on SAMPLE_DATA so UI still works during integration
				const all = SAMPLE_DATA;
				const start = (pageNumber - 1) * size;
				const paged = all.slice(start, start + size);
				setItems(paged);
				setTotal(all.length);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		},
		[page, pageSize, filters]
	);

	// Initial + dependency-driven fetch
	useEffect(() => {
		fetchClosetItems({ pageNumber: page, size: pageSize, filters });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, pageSize, filters]);

	// Handler helpers
	const handleFilterChange = (key, value) => {
		console.log("[Closet] filter change", key, value);
		setFilters((prev) => ({ ...prev, [key]: value }));
		setPage(1); // reset to first page when filters change
	};

	const handlePageChange = (newPage) => {
		if (newPage < 1) return;
		const totalPages = Math.max(1, Math.ceil(total / pageSize));
		if (newPage > totalPages) return;
		setPage(newPage);
	};

	const handleArchive = async (id) => {
		console.log("[Closet] archive item", id);
		// Call backend archive endpoint here, then refetch the current page
		// Example:
		// await fetch(`/api/closet/${id}/archive`, { method: 'POST' })
		// For now simulate immediate removal by refetching
		fetchClosetItems({ pageNumber: page, size: pageSize, filters });
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
			console.log("[Closet] action view", item);
			setOpen(false);
		};
		const handleEdit = () => {
			console.log("[Closet] action edit", item);
			setOpen(false);
		};
		const handleArchiveAction = () => {
			console.log("[Closet] action archive", item);
			handleArchive(item.id);
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
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
				<div className="flex items-center gap-3">
					<div className="text-sm font-semibold text-[#6A6D57] border-b-2 border-[#6A6D57] pb-1">
						All Items
					</div>
				</div>

				<div className="flex items-center gap-2">
					<div className="flex items-center gap-2 text-sm text-gray-500 border rounded-lg px-3 py-2 bg-white">
						<span>Sort by Date</span>
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 9l-7 7-7-7"
							></path>
						</svg>
					</div>
				</div>
			</div>

			{/* Mobile cards */}
			<div className="md:hidden space-y-3">
				{loading ? (
					<div className="text-sm text-gray-500">Loading...</div>
				) : items.length === 0 ? (
					<div className="text-sm text-gray-600">No items found</div>
				) : (
					items.map((it) => (
						<div
							key={it.id}
							className="p-3 bg-gray-50 rounded-md flex items-start justify-between"
						>
							<div>
								<div className="text-sm font-semibold text-gray-800">
									{it.title}
								</div>
								<div className="text-xs text-gray-500">
									{it.category} • {it.uploadedBy}
								</div>
								<div className="mt-1 text-xs">
									{it.tags &&
										it.tags.map((t, i) => (
											<span
												key={i}
												className="inline-block bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full mr-1 text-xs"
											>
												{t}
											</span>
										))}
								</div>
							</div>
							<div className="text-right">
								<div className="text-xs text-gray-500">
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
							<tr className="text-left text-xs text-gray-500 border-b">
								<th className="px-4 py-3">Item</th>
								<th className="px-4 py-3">Category</th>
								<th className="px-4 py-3">Tags</th>
								<th className="px-4 py-3">Uploaded By</th>
								<th className="px-4 py-3">Status</th>
								<th className="px-4 py-3">Date Added</th>
								<th className="px-4 py-3">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y">
							{loading ? (
								<tr>
									<td
										colSpan={7}
										className="px-4 py-6 text-center text-gray-500"
									>
										Loading...
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
										<td className="px-4 py-3 flex items-center gap-3">
											<div className="h-10 w-10 bg-gray-100 rounded-md flex-shrink-0" />
											<div>
												<div className="font-medium text-gray-800">
													{it.title}
												</div>
											</div>
										</td>
										<td className="px-4 py-3">
											{it.category}
										</td>
										<td className="px-4 py-3">
											{it.tags &&
												it.tags.map((t, i) => (
													<span
														key={i}
														className="inline-block bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full mr-1 text-xs"
													>
														{t}
													</span>
												))}
										</td>
										<td className="px-4 py-3">
											{it.uploadedBy}
										</td>
										<td className="px-4 py-3">
											<span
												className={`px-2 py-1 rounded-full text-xs ${
													it.status === "Uploaded"
														? "bg-green-50 text-green-700"
														: "bg-gray-100 text-gray-600"
												}`}
											>
												{it.status}
											</span>
										</td>
										<td className="px-4 py-3">
											{it.dateAdded}
										</td>
										<td className="px-4 py-3">
											<div className="flex items-center gap-2">
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

			{/* Pagination: Prev, 3 page numbers, Next */}
			<div className="mt-4 flex items-center justify-end text-sm">
				<div className="flex items-center gap-2">
					<button
						onClick={() => handlePageChange(page - 1)}
						disabled={page === 1}
						className={`px-3 py-1 border rounded ${
							page === 1
								? "text-gray-300 border-gray-200"
								: "text-gray-600 hover:bg-gray-50"
						}`}
					>
						Prev
					</button>

					{/* three page numbers window */}
					{(() => {
						const maxButtons = 3;
						if (totalPages <= maxButtons) {
							return Array.from(
								{ length: totalPages },
								(_, i) => i + 1
							).map((p) => (
								<button
									key={p}
									onClick={() => handlePageChange(p)}
									className={`w-10 h-8 rounded-md text-sm ${
										p === page
											? "bg-[#bfc986] text-gray-900 font-semibold"
											: "border text-gray-600 hover:bg-gray-50"
									}`}
								>
									{p}
								</button>
							));
						}

						// center the current page in the 3-button window when possible
						let start = page - 1;
						if (start < 1) start = 1;
						let end = start + maxButtons - 1;
						if (end > totalPages) {
							end = totalPages;
							start = totalPages - maxButtons + 1;
						}

						const buttons = [];
						for (let p = start; p <= end; p++) {
							buttons.push(
								<button
									key={p}
									onClick={() => handlePageChange(p)}
									className={`w-10 h-8 rounded-md text-sm ${
										p === page
											? "bg-[#bfc986] text-gray-900 font-semibold"
											: "border text-gray-600 hover:bg-gray-50"
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
						className={`px-3 py-1 border rounded ${
							page === totalPages
								? "text-gray-300 border-gray-200"
								: "text-gray-600 hover:bg-gray-50"
						}`}
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default ClosetManagementTable;
