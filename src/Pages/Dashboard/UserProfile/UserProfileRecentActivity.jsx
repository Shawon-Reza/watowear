import { CheckCircle, Clock, X } from "lucide-react";
import { useState } from "react";

const SAMPLE_ACTIVITIES = [
	{
		id: 1,
		title: "Added New Items",
		subtitle: "Items Name :",
		time: "2 days ago",
		status: "Success",
	},
	{
		id: 2,
		title: "Generated Outfit",
		subtitle: "Outfit Name :",
		time: "6 days ago",
		status: "Success",
	},
];

export default function UserProfileRecentActivity() {
	const [showModal, setShowModal] = useState(false);

	// form state for edit modal
	const [planName, setPlanName] = useState("Pro plan");
	const [price, setPrice] = useState(0);
	const [duration, setDuration] = useState("30 days");
	const [billing, setBilling] = useState("Monthly");
	const [features, setFeatures] = useState([
		"Main Feature -1",
		"Main Feature -2",
		"Main Feature -3",
		"Main Feature -4",
	]);

	const addFeature = () => setFeatures((f) => [...f, ""]);
	const updateFeature = (idx, val) =>
		setFeatures((f) => f.map((item, i) => (i === idx ? val : item)));
	const removeFeature = (idx) =>
		setFeatures((f) => f.filter((_, i) => i !== idx));

	const saveChanges = () => {
		console.log("Save plan", {
			planName,
			price,
			duration,
			billing,
			features,
		});
		setShowModal(false);
	};
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			{/* Left: Recent Activities (spans 2 cols on md+) */}
			<div className="md:col-span-2 bg-white rounded-2xl border border-[#e9e9e6] shadow-sm overflow-hidden">
				<div className="px-6 py-4 border-b border-[#f2f2ef]">
					<h3 className="text-lg font-semibold text-[#33402d] flex items-center gap-3">
						<span className="w-5 h-5 rounded-sm bg-[#f3f5f1] flex items-center justify-center text-[#6A6D57]"></span>
						Recent Activities
					</h3>
				</div>

				<div className="p-6">
					<div className="space-y-6">
						{SAMPLE_ACTIVITIES.map((act) => (
							<div
								key={act.id}
								className="flex items-start justify-between"
							>
								<div className="flex-1">
									<div className="text-sm font-semibold text-[#222]">
										{act.title}
									</div>
									<div className="text-sm text-[#6A6D57]/80 mt-2">
										{act.subtitle}
									</div>
								</div>

								<div className="ml-6 flex flex-col items-end">
									<div className="inline-flex items-center gap-2 text-sm">
										<span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
											<CheckCircle size={14} />
											<span className="ml-1">
												{act.status}
											</span>
										</span>
									</div>
									<div className="text-xs text-[#6A6D57]/70 mt-2 flex items-center gap-1">
										<Clock size={12} /> {act.time}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Right: Subscription Edit */}
			<div className="bg-white rounded-2xl border border-[#e9e9e6] shadow-sm p-6">
				<h4 className="text-base font-semibold text-[#33402d] mb-4">
					Subscription Edit
				</h4>

				<div className="bg-[#6A6D57] text-white rounded-md p-3 text-center font-medium">
					Plus Plan
				</div>

				<div className="mt-6 space-y-3 text-sm text-[#6A6D57]/90">
					<div className="flex justify-between">
						<div>Billing Cycle</div>
						<div>Monthly</div>
					</div>

					<div className="flex justify-between">
						<div>Payment Method</div>
						<div>Visa Card</div>
					</div>

					<div className="flex justify-between">
						<div>Renewal Date</div>
						<div>April 1, 2025</div>
					</div>
				</div>

				<div className="mt-6">
					<button
						onClick={() => setShowModal(true)}
						className="w-full py-2 rounded-lg border border-[#d7d7d2] text-[#6A6D57] bg-white/80"
					>
						Edit Details
					</button>
				</div>

				{/* Edit modal */}
				{showModal && (
					<div className="fixed inset-0 z-50 flex items-center justify-center">
						<div
							className="absolute inset-0 bg-black/40"
							onClick={() => setShowModal(false)}
						/>

						<div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 mx-4">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-lg font-semibold">
									Pro Plan
								</h3>
								<button
									onClick={() => setShowModal(false)}
									className="p-2"
								>
									<X size={18} />
								</button>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm text-gray-600">
										Plan Name
									</label>
									<input
										value={planName}
										onChange={(e) =>
											setPlanName(e.target.value)
										}
										className="mt-1 w-full border rounded-md px-3 py-2"
									/>
								</div>
								<div>
									<label className="block text-sm text-gray-600">
										Price ($)
									</label>
									<input
										type="number"
										value={price}
										onChange={(e) =>
											setPrice(Number(e.target.value))
										}
										className="mt-1 w-full border rounded-md px-3 py-2"
									/>
								</div>

								<div>
									<label className="block text-sm text-gray-600">
										Duration
									</label>
									<input
										value={duration}
										onChange={(e) =>
											setDuration(e.target.value)
										}
										className="mt-1 w-full border rounded-md px-3 py-2"
									/>
								</div>

								<div>
									<label className="block text-sm text-gray-600">
										Billing
									</label>
									<input
										value={billing}
										onChange={(e) =>
											setBilling(e.target.value)
										}
										className="mt-1 w-full border rounded-md px-3 py-2"
									/>
								</div>
							</div>

							<div className="mt-4">
								<div className="text-sm font-medium text-gray-700 mb-2">
									Features List
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
									{features.map((f, idx) => (
										<div
											key={idx}
											className="flex items-center gap-2"
										>
											<input
												value={f}
												onChange={(e) =>
													updateFeature(
														idx,
														e.target.value
													)
												}
												className="flex-1 border rounded-md px-3 py-2"
											/>
											<button
												onClick={() =>
													removeFeature(idx)
												}
												className="text-red-500 p-2"
											>
												🗑
											</button>
										</div>
									))}
								</div>

								<div className="mt-3 flex items-center gap-2">
									<input
										placeholder="Add new features (optional)"
										className="flex-1 border rounded-md px-3 py-2"
									/>
									<button
										onClick={addFeature}
										className="px-3 py-2 bg-[#6A6D57] text-white rounded-md"
									>
										+
									</button>
								</div>
							</div>

							<div className="mt-6">
								<button
									onClick={saveChanges}
									className="w-full py-3 bg-[#6A6D57] text-white rounded-md flex items-center justify-center gap-2"
								>
									<svg
										className="w-4 h-4"
										viewBox="0 0 24 24"
										fill="none"
									>
										<path
											d="M5 12h14"
											stroke="white"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>{" "}
									Save Changes
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
