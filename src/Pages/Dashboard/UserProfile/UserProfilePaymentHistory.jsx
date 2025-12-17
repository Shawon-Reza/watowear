import { Download, FileText, MoreVertical } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const SAMPLE_PAYMENTS = [
	{
		id: 1,
		date: "2025-10-01",
		plan: "Plus Plan",
		amount: 24.99,
		method: "Card • **** 4242",
		status: "Paid",
		tx: "TXN-1001",
	},
	{
		id: 2,
		date: "2025-09-01",
		plan: "Plus Plan",
		amount: 24.99,
		method: "Card • **** 4242",
		status: "Paid",
		tx: "TXN-0956",
	},
	{
		id: 3,
		date: "2025-08-01",
		plan: "Plus Plan",
		amount: 24.99,
		method: "Card • **** 4242",
		status: "Failed",
		tx: "TXN-0892",
	},
	{
		id: 4,
		date: "2025-07-01",
		plan: "Plus Plan",
		amount: 24.99,
		method: "Card • **** 4242",
		status: "Paid",
		tx: "TXN-0744",
	},
	{
		id: 5,
		date: "2025-06-01",
		plan: "Basic",
		amount: 0.0,
		method: "N/A",
		status: "Free",
		tx: "TXN-0610",
	},
];

export default function UserProfilePaymentHistory() {
	const [payments] = useState(SAMPLE_PAYMENTS);
	const [search, setSearch] = useState("");
	const [openMenuId, setOpenMenuId] = useState(null);
	const containerRef = useRef(null);

	useEffect(() => {
		function onDocClick(e) {
			if (!containerRef.current) return;
			if (!containerRef.current.contains(e.target)) {
				setOpenMenuId(null);
			}
		}
		document.addEventListener("click", onDocClick);
		return () => document.removeEventListener("click", onDocClick);
	}, []);

	const filtered = useMemo(() => {
		const q = search.trim().toLowerCase();
		if (!q) return payments;
		return payments.filter(
			(p) =>
				p.plan.toLowerCase().includes(q) ||
				String(p.tx).toLowerCase().includes(q) ||
				p.method.toLowerCase().includes(q)
		);
	}, [payments, search]);

	const statusClass = (s) => {
		if (s === "Paid") return "bg-green-100 text-green-700";
		if (s === "Failed") return "bg-red-100 text-red-700";
		if (s === "Pending") return "bg-yellow-100 text-yellow-700";
		return "bg-gray-100 text-gray-700";
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between mb-2">
				<h2 className="text-xl font-bold text-[#333]">
					Payment History
				</h2>
			</div>

			{/* Desktop table */}
			<div className="hidden md:block overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="bg-[#f9f9f9] border-b border-gray-100">
							<th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
								Transaction ID
							</th>
							<th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
								Items
							</th>
							<th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
								Ammount
							</th>
							<th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
								Status
							</th>
							<th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
								Date
							</th>
							<th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
								Payment Method
							</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-gray-100">
						{filtered.map((p) => {
							const isPaid = p.status === "Paid";
							const isFailed = p.status === "Failed";
							const statusText = isPaid
								? "Succeed"
								: isFailed
								? "Failed"
								: p.status;
							const statusBg = isPaid
								? "bg-[#22c55e]"
								: isFailed
								? "bg-[#ff5656]"
								: "bg-gray-400";

							// Mock items count based on id
							const itemsCount = 5;

							return (
								<tr
									key={p.id}
									className="hover:bg-gray-50 transition-all"
								>
									<td className="px-6 py-4">
										<div className="text-sm font-medium text-gray-900">
											{p.tx}
										</div>
										<div className="text-xs text-gray-400">
											ch_1234
										</div>
									</td>
									<td className="px-6 py-4 text-sm text-gray-600">
										{itemsCount}
									</td>
									<td className="px-6 py-4 text-sm text-gray-600">
										${p.amount.toFixed(2)}
									</td>
									<td className="px-6 py-4 text-center">
										<span
											className={`inline-block w-full py-2 text-xs font-medium text-white ${statusBg}`}
										>
											{statusText}
										</span>
									</td>
									<td className="px-6 py-4 text-sm text-gray-600">
										11/15/25
									</td>
									<td className="px-6 py-4 text-sm text-gray-600">
										{p.method.includes("Card")
											? "VISA Card"
											: p.method}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			{/* Mobile View - Fallback to simple list if needed or keep existing cards but styled simpler */}
			<div className="md:hidden space-y-4">
				{filtered.map((p) => (
					<div
						key={p.id}
						className="border rounded-lg p-4 bg-gray-50"
					>
						<div className="flex justify-between items-start mb-2">
							<div>
								<div className="font-semibold text-sm">
									{p.tx}
								</div>
								<div className="text-xs text-gray-500">
									11/15/25
								</div>
							</div>
							<div
								className={`px-2 py-1 text-xs text-white rounded ${
									p.status === "Paid"
										? "bg-green-500"
										: "bg-red-500"
								}`}
							>
								{p.status === "Paid" ? "Succeed" : "Failed"}
							</div>
						</div>
						<div className="flex justify-between text-sm">
							<span>Amount</span>
							<span>${p.amount.toFixed(2)}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
