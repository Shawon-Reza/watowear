import { useMemo, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

/**
 * FashionHistoryManagement
 * - items: array of fashion library history items from parent (History)
 *   { id, title, thumbnail, status, actionTakenBy, date }
 *
 * This component is responsive and ready to receive real backend data via the `items` prop.
 */
export default function FashionHistoryManagement({
	items = [],
	title = "Fashion Library Management ( AI )",
}) {
	// Debug: log incoming data to help integration
	console.log("FashionHistoryManagement items:", items);

	const [tab, setTab] = useState("All");
	const [page, setPage] = useState(1);
	const pageSize = 6;
	const [sortDir, setSortDir] = useState("desc");

	const tabs = ["All", "Removed", "Approved"];

	const filtered = useMemo(() => {
		let list = items || [];
		if (tab !== "All")
			list = list.filter(
				(it) => (it.status || "").toLowerCase() === tab.toLowerCase()
			);
		list = list.slice().sort((a, b) => {
			const ta = new Date(a.date).getTime() || 0;
			const tb = new Date(b.date).getTime() || 0;
			return sortDir === "asc" ? ta - tb : tb - ta;
		});
		return list;
	}, [items, tab, sortDir]);

	const total = filtered.length;
	const pageCount = Math.max(1, Math.ceil(total / pageSize));
	const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

	function formatDate(d) {
		if (!d) return "";
		const dt = new Date(d);
		return dt.toLocaleString();
	}

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
			<div className="flex items-start justify-between mb-4">
				<div>
					<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
						{title}
					</h3>
					<div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
						{tabs.map((t) => (
							<button
								key={t}
								onClick={() => {
									setTab(t);
									setPage(1);
								}}
								className={`px-3 py-1 rounded ${
									tab === t
										? "bg-gray-100 dark:bg-gray-700 text-gray-900"
										: "text-gray-600"
								}`}
							>
								{t}
							</button>
						))}
					</div>
				</div>

				<div className="flex items-center gap-3">
					<label className="text-sm text-gray-600">
						Sort by Date
					</label>
					<select
						value={sortDir}
						onChange={(e) => setSortDir(e.target.value)}
						className="border rounded px-2 py-1 text-sm"
					>
						<option value="desc">Newest</option>
						<option value="asc">Oldest</option>
					</select>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full text-left text-sm">
					<thead>
						<tr className="text-gray-500">
							<th className="py-3 px-4">Item</th>
							<th className="py-3 px-4">Status</th>
							<th className="py-3 px-4">Action Taken By</th>
							<th className="py-3 px-4">Date & Time</th>
							<th className="py-3 px-4">Actions</th>
						</tr>
					</thead>
					<tbody>
						{pageItems.map((it) => (
							<tr key={it.id} className="border-t">
								<td className="py-4 px-4 align-middle">
									<div className="flex items-center gap-3">
										{it.thumbnail ? (
											<img
												src={it.thumbnail}
												alt={it.title}
												className="w-12 h-12 rounded-md object-cover"
											/>
										) : (
											<div className="w-12 h-12 rounded-md bg-gray-100" />
										)}
										<div>
											<div className="text-gray-800 dark:text-gray-100 font-medium">
												{it.title}
											</div>
										</div>
									</div>
								</td>

								<td className="py-4 px-4">
									<span className="inline-flex items-center px-2 py-1 rounded text-xs bg-red-100 text-red-700">
										{it.status}
									</span>
								</td>
								<td className="py-4 px-4">
									{it.actionTakenBy || "-"}
								</td>
								<td className="py-4 px-4">
									{formatDate(it.date)}
								</td>
								<td className="py-4 px-4">
									<button className="p-1 rounded hover:bg-gray-100">
										<HiDotsVertical className="w-5 h-5 text-gray-500" />
									</button>
								</td>
							</tr>
						))}

						{pageItems.length === 0 && (
							<tr>
								<td
									colSpan={5}
									className="py-6 px-4 text-center text-gray-500"
								>
									No results
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<div className="mt-4 flex items-center justify-between text-sm text-gray-600">
				<div>
					Showing {Math.min(total, (page - 1) * pageSize + 1)} to{" "}
					{Math.min(total, page * pageSize)} of {total} result
					{total !== 1 ? "s" : ""}
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
	);
}
