import { BrainCircuit, CircleCheckBig, Clock4 } from "lucide-react";
import { useState } from "react";
import { TfiStatsUp } from "react-icons/tfi";
import RecentOutfitSuggestion from "./RecentOutfitSuggestion";

const AI_Performence = () => {
	// Dynamic stats for cards (swap with backend values when available)
	const stats = {
		suggestionsAccuracy: {
			value: 92.7,
			change: 2.3,
			percent: 92.7,
			color: "#6366F1",
		},
		userAcceptance: {
			value: 78.4,
			change: 4.1,
			percent: 78.4,
			color: "#22C55E",
		},
		avgResponse: {
			value: "1.2s",
			change: null,
			percent: 40,
			color: "#3B82F6",
		},
		totalSuggestions: { value: 145872, percent: 65, color: "#A855F7" },
	};

	const [isEditing, setIsEditing] = useState(false);
	const [text, setText] = useState(
		"A modern high-fashion editorial photoshoot featuring a model standing in an urban city street at dusk. The outfit combines contemporary streetwear with luxury couture elements: an oversized tailored blazer layered over a sleek silk slip dress, paired with chunky statement boots. Accessories include bold geometric earrings, a structured leather handbag, and futuristic sunglasses. The mood is confident, chic, and cosmopolitan, with soft neon reflections from city lights adding a cinematic glow. The overall style should feel sophisticated yet edgy, balancing elegance with street-style attitude."
	);

	const [draft, setDraft] = useState(text);

	const handleEdit = () => {
		setDraft(text);
		setIsEditing(true);
	};

	const handleSave = () => {
		setText(draft);
		setIsEditing(false);
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h2 className="text-3xl font-bold text-gray-900">
					AI Performance
				</h2>
				<p className="text-gray-500">
					Monitor AI outfit suggestions and performance metrics
				</p>
			</div>

			{/* cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{/* Suggestions Accuracy */}
				<div className="p-4 rounded-xl border-l-4 border-l-[#6A6D57] bg-white shadow-sm hover:shadow transition-shadow duration-150">
					<h3 className="text-sm text-[#6B7280]">
						Suggestions Accuracy
					</h3>
					<div className="flex items-center justify-between py-3">
						<h1 className="font-extrabold text-2xl">
							{stats.suggestionsAccuracy.value}%
						</h1>
						<div className="p-1 rounded-md bg-gray-50">
							<BrainCircuit
								size={20}
								className="text-[#6366F1]"
							/>
						</div>
					</div>
					<p className="text-xs text-[#6B7280]">
						<span className="text-green-500">
							+{stats.suggestionsAccuracy.change}%
						</span>{" "}
						vs last month
					</p>
					<div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
						<div
							className="h-1.5 rounded-full"
							style={{
								width: `${stats.suggestionsAccuracy.percent}%`,
								background: stats.suggestionsAccuracy.color,
							}}
						/>
					</div>
				</div>

				{/* User Acceptance Rate */}
				<div className="p-4 rounded-xl border-l-4 border-l-[#6A6D57] bg-white shadow-sm hover:shadow transition-shadow duration-150">
					<h3 className="text-sm text-[#6B7280]">
						User Acceptance Rate
					</h3>
					<div className="flex items-center justify-between py-3">
						<h1 className="font-extrabold text-2xl">
							{stats.userAcceptance.value}%
						</h1>
						<div className="p-1 rounded-md bg-gray-50">
							<CircleCheckBig
								size={20}
								className="text-[#22C55E]"
							/>
						</div>
					</div>
					<p className="text-xs text-[#6B7280]">
						<span className="text-green-500">
							+{stats.userAcceptance.change}%
						</span>{" "}
						vs last month
					</p>
					<div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
						<div
							className="h-1.5 rounded-full"
							style={{
								width: `${stats.userAcceptance.percent}%`,
								background: stats.userAcceptance.color,
							}}
						/>
					</div>
				</div>

				{/* Avg Response Time */}
				<div className="p-4 rounded-xl border-l-4 border-l-[#6A6D57] bg-white shadow-sm hover:shadow transition-shadow duration-150">
					<h3 className="text-sm text-[#6B7280]">
						Avg. Response Time
					</h3>
					<div className="flex items-center justify-between py-3">
						<h1 className="font-extrabold text-2xl">
							{stats.avgResponse.value}
						</h1>
						<div className="p-1 rounded-md bg-gray-50">
							<Clock4 size={20} className="text-[#3B82F6]" />
						</div>
					</div>
					<p className="text-xs text-[#6B7280]">
						{stats.avgResponse.change !== null
							? `${stats.avgResponse.change}% vs last month`
							: "N/A"}
					</p>
					<div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
						<div
							className="h-1.5 rounded-full"
							style={{
								width: `${stats.avgResponse.percent}%`,
								background: stats.avgResponse.color,
							}}
						/>
					</div>
				</div>

				{/* Total Suggestions */}
				<div className="p-4 rounded-xl border-l-4 border-l-[#6A6D57] bg-white shadow-sm hover:shadow transition-shadow duration-150">
					<h3 className="text-sm text-[#6B7280]">
						Daily Suggestions
					</h3>
					<div className="flex items-center justify-between py-3">
						<h1 className="font-extrabold text-2xl">
							{stats.totalSuggestions.value.toLocaleString()}
						</h1>
						<div className="p-1 rounded-md bg-gray-50">
							<TfiStatsUp size={20} className="text-[#A855F7]" />
						</div>
					</div>
					<div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
						<div
							className="h-1.5 rounded-full"
							style={{
								width: `${stats.totalSuggestions.percent}%`,
								background: stats.totalSuggestions.color,
							}}
						/>
					</div>
				</div>
			</div>

			<div className="space-y-8">
				<h1 className="text-3xl font-bold text-gray-900">
					Prompt Modify
				</h1>

				<div className="space-y-6">
					<div className="bg-white p-4 sm:p-6 shadow drop-shadow-md rounded-[10px]">
						{isEditing ? (
							<textarea
								className="w-full p-2 bg-white border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]"
								rows={4}
								value={draft}
								onChange={(e) => setDraft(e.target.value)}
							/>
						) : (
							<p className="text-[#747474] leading-relaxed text-sm">
								{text}
							</p>
						)}
					</div>

					<div className="w-full flex flex-col sm:flex-row items-center gap-3 rounded-[12px]">
						{!isEditing ? (
							<button
								className="border border-[#6A6D57] flex-1 py-2 rounded-[6px] hover:bg-gray-100 text-base text-[#2C2C2C] font-extrabold"
								onClick={handleEdit}
							>
								Edit
							</button>
						) : (
							<button
								className="border border-red-500 flex-1 py-2 rounded-[6px] bg-red-100 hover:bg-red-200 text-base font-extrabold text-red-700"
								onClick={() => setIsEditing(false)}
							>
								Cancel
							</button>
						)}

						<button
							className="border flex-1 py-2 rounded-[6px] bg-[#6A6D57] hover:bg-[#585a48] text-base font-extrabold text-white"
							onClick={handleSave}
						>
							Save
						</button>
					</div>
				</div>
			</div>

			<div>
				<RecentOutfitSuggestion />
			</div>
		</div>
	);
};

export default AI_Performence;
