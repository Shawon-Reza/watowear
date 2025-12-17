import { Tags } from "lucide-react";
import { useState } from "react";

const CategoryTags = () => {
	// Defines the list of mandatory tags from the design
	// In a real app, this state might be managed globally or fetched from backend
	const [mandatoryTags, setMandatoryTags] = useState([
		{ id: "season", label: "season", active: true },
		{ id: "subcategory", label: "subcategory", active: true },
		{ id: "exact_genre", label: "exact_genre", active: true },
		{ id: "main_color", label: "main_color", active: true },
		{ id: "season_2", label: "season", active: true }, // Duplicate label from image, keeping unique ID
		{ id: "material_blend", label: "material_blend", active: true },
		{ id: "occasion", label: "occasion", active: true },
		{ id: "formality", label: "formality", active: true },
	]);

	const toggleTag = (id) => {
		setMandatoryTags((prev) =>
			prev.map((tag) =>
				tag.id === id ? { ...tag, active: !tag.active } : tag
			)
		);
	};

	return (
		<div className="bg-white rounded-xl border border-[#6A6D57]/10 shadow-sm overflow-hidden">
			<h1 className="text-[#303030] font-semibold text-lg border-b p-6">
				Mandatory Tags
			</h1>
			<div className="p-6">
				{/* Header row */}
				<div className="flex items-center justify-between text-xs text-gray-500 uppercase tracking-wider mb-4 px-2">
					<span>Name</span>
					<span>Action</span>
				</div>

				<div className="space-y-1">
					{mandatoryTags.map((tag) => (
						<div
							key={tag.id}
							className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors"
						>
							<div className="flex items-center gap-3">
								<Tags size={16} className="text-[#6A6D57]" />
								<span className="text-sm font-medium text-gray-700">
									{tag.label}
								</span>
							</div>
							<div className="">
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={tag.active}
										onChange={() => toggleTag(tag.id)}
										className="sr-only peer"
									/>
									<div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#8F974A]"></div>
								</label>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CategoryTags;
