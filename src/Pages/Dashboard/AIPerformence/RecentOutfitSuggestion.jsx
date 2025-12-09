import React, { useState, useEffect, useRef } from "react";

const RecentOutfitSuggestion = () => {
	const [visibleItems, setVisibleItems] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const loaderRef = useRef(null);

	const initialItems = [
		{
			id: 1,
			user: "Emma Johnson",
			category: "Casual Summer Look",
			feedback: "Accepted",
		},
		{
			id: 2,
			user: "Michael Chen",
			category: "Business Meeting",
			feedback: "Accepted",
		},
		{
			id: 3,
			user: "Sophia Rodriguez",
			category: "Evening Dinner",
			feedback: "Rejected",
		},
		{
			id: 4,
			user: "James Wilson",
			category: "Workout Session",
			feedback: "Accepted",
		},
		{
			id: 5,
			user: "Olivia Martinez",
			category: "Beach Day",
			feedback: "Rejected",
		},
	];

	useEffect(() => {
		setVisibleItems(initialItems.slice(0, 3));
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore) {
					const nextItems = initialItems.slice(
						visibleItems.length,
						visibleItems.length + 2
					);
					if (nextItems.length > 0) {
						setVisibleItems((prev) => [...prev, ...nextItems]);
					} else {
						setHasMore(false);
					}
				}
			},
			{ threshold: 1.0 }
		);

		if (loaderRef.current) {
			observer.observe(loaderRef.current);
		}

		return () => {
			if (loaderRef.current) {
				observer.unobserve(loaderRef.current);
			}
		};
	}, [visibleItems, hasMore]);

	return (
		<div className="p-4 sm:p-6 bg-white rounded-md shadow-sm">
			<h2 className="text-xl sm:text-2xl font-semibold text-[#6A6D57] mb-4">
				Recent Outfit Suggestions
			</h2>

			{/* Mobile: stacked cards */}
			<div className="md:hidden space-y-3 mb-3">
				{visibleItems.map((item) => (
					<div
						key={item.id}
						className="p-3 bg-gray-50 rounded-md shadow-sm"
					>
						<div className="flex items-start justify-between">
							<div>
								<div className="text-sm font-semibold text-[#6A6D57]">
									{item.user}
								</div>
								<div className="text-xs text-gray-600">
									{item.category}
								</div>
							</div>
							<div className="text-right">
								<div
									className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
										item.feedback === "Accepted"
											? "bg-green-50 text-green-700"
											: "bg-red-50 text-red-700"
									}`}
								>
									{item.feedback}
								</div>
								<button
									className="mt-2 block text-xs text-gray-600 hover:text-gray-800"
									onClick={() =>
										console.log(
											`View message for ${item.user}`
										)
									}
								>
									View Message
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Desktop/tablet: compact table */}
			<div
				className="hidden md:block overflow-auto"
				style={{ maxHeight: 420 }}
			>
				<table className="w-full text-sm">
					<thead className="bg-gradient-to-r from-[#F4F1EB] to-white">
						<tr className="border-b border-[#6A6D57]/10">
							<th className="px-4 py-3 text-left font-semibold text-[#6A6D57] uppercase tracking-wider">
								User
							</th>
							<th className="px-4 py-3 text-left font-semibold text-[#6A6D57] uppercase tracking-wider">
								Category
							</th>
							<th className="px-4 py-3 text-left font-semibold text-[#6A6D57] uppercase tracking-wider">
								Feedback
							</th>
							<th className="px-4 py-3 text-left font-semibold text-[#6A6D57] uppercase tracking-wider">
								Message Request
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-[#6A6D57]/10">
						{visibleItems.map((itemData) => (
							<tr
								key={itemData.id}
								className="group hover:bg-[#F9FAF7] transition-all duration-200"
							>
								<td className="px-4 py-3 text-[#6A6D57] font-medium">
									{itemData.user}
								</td>
								<td className="px-4 py-3 text-[#6A6D57]">
									{itemData.category}
								</td>
								<td className="px-4 py-3">
									<span
										className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
											itemData.feedback === "Accepted"
												? "bg-green-50 text-green-700"
												: "bg-red-50 text-red-700"
										}`}
									>
										{itemData.feedback}
									</span>
								</td>
								<td className="px-4 py-3">
									<button
										className="text-gray-600 text-xs font-semibold hover:text-gray-800 bg-[#F6F4EE] rounded px-3 py-1 transition-colors"
										onClick={() =>
											console.log(
												`View message for ${itemData.user}`
											)
										}
									>
										View Message
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{hasMore && (
					<div
						ref={loaderRef}
						className="py-3 text-center text-sm text-gray-600"
					>
						Loading more...
					</div>
				)}
			</div>

			<div className="mt-3 text-center">
				<button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
					View All Suggestions
				</button>
			</div>
		</div>
	);
};

export default RecentOutfitSuggestion;
