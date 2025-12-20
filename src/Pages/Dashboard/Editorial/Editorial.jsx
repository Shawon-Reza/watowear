import {
	Plus,
	Tag,
	Calendar,
	Clock,
	X,
	ChevronDown,
	Image as ImageIcon,
	Pin,
	Trash2,
} from "lucide-react";
import { PiNotepad } from "react-icons/pi";
import { useEffect, useState } from "react";
import useEditorialStore from "../../../store/useEditorialStore";
import axiosClient from "../../../api/axiosClient";

const Editorial = () => {
	const { editorials, loading, error, fetchEditorials, createEditorial } =
		useEditorialStore();
	const [showForm, setShowForm] = useState(false);

	// Form State
	const [mainData, setMainData] = useState({
		title: "",
		subline: "",
		category: "",
		description: "",
		status: "published",
		tags: [],
		image: null,
		imagePreview: null,
	});

	const [subSections, setSubSections] = useState([
		{ title: "", description: "", image: null, imagePreview: null },
	]);

	const [newTag, setNewTag] = useState("");

	useEffect(() => {
		fetchEditorials();
	}, [fetchEditorials]);

	// Derive stats
	const stats = [
		{
			title: "Total Editorial",
			value: (editorials?.length || 0).toString(),
			icon: <PiNotepad size={24} className="text-blue-600" />,
			bg: "bg-blue-100",
		},
		{
			title: "Recent Editorial",
			value: (editorials || [])
				.filter((e) => {
					if (!e.published_at) return false;
					const d = new Date(e.published_at);
					const now = new Date();
					const diff = (now - d) / (1000 * 60 * 60 * 24);
					return diff < 7;
				})
				.length.toString(),
			icon: <PiNotepad size={24} className="text-gray-600" />,
			bg: "bg-gray-200",
		},
		{
			title: "Old Editorial",
			value: (editorials || [])
				.filter((e) => {
					if (!e.published_at) return false;
					const d = new Date(e.published_at);
					const now = new Date();
					const diff = (now - d) / (1000 * 60 * 60 * 24);
					return diff >= 30;
				})
				.length.toString(),
			icon: <PiNotepad size={24} className="text-yellow-600" />,
			bg: "bg-yellow-100",
		},
	];

	const handleAddTag = () => {
		if (newTag.trim() && !mainData.tags.includes(newTag.trim())) {
			setMainData({
				...mainData,
				tags: [...mainData.tags, newTag.trim()],
			});
			setNewTag("");
		}
	};

	const handleRemoveTag = (tagName) => {
		setMainData({
			...mainData,
			tags: mainData.tags.filter((t) => t !== tagName),
		});
	};

	const handleMainImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setMainData({
				...mainData,
				image: file,
				imagePreview: URL.createObjectURL(file),
			});
		}
	};

	const handleSubSectionChange = (index, field, value) => {
		const updated = [...subSections];
		updated[index][field] = value;
		setSubSections(updated);
	};

	const handleSubSectionImageChange = (index, e) => {
		const file = e.target.files[0];
		if (file) {
			const updated = [...subSections];
			updated[index].image = file;
			updated[index].imagePreview = URL.createObjectURL(file);
			setSubSections(updated);
		}
	};

	const addSubSection = () => {
		setSubSections([
			...subSections,
			{ title: "", description: "", image: null, imagePreview: null },
		]);
	};

	const removeSubSection = (index) => {
		setSubSections(subSections.filter((_, i) => i !== index));
	};

	const handlePublish = async () => {
		const fd = new FormData();
		fd.append("title", mainData.title);
		if (mainData.subline) fd.append("subline", mainData.subline);
		fd.append("category", mainData.category);
		fd.append("description", mainData.description);
		fd.append("status", mainData.status);
		fd.append("tags", JSON.stringify(mainData.tags));
		if (mainData.image) fd.append("image", mainData.image);

		subSections.forEach((sub, index) => {
			fd.append(`sub_sections[${index}][title]`, sub.title);
			fd.append(`sub_sections[${index}][description]`, sub.description);
			if (sub.image)
				fd.append(`sub_sections[${index}][image]`, sub.image);
			fd.append(`sub_sections[${index}][order]`, index);
		});

		const res = await createEditorial(fd);
		if (res.success) {
			setShowForm(false);
			// Reset form
			setMainData({
				title: "",
				subline: "",
				category: "",
				description: "",
				status: "published",
				tags: [],
				image: null,
				imagePreview: null,
			});
			setSubSections([
				{ title: "", description: "", image: null, imagePreview: null },
			]);
		} else {
			alert(res.error || "Failed to publish editorial");
		}
	};

	if (showForm) {
		return (
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-bold text-[#1B1B1B]">
						Add New Editorial
					</h1>
					<button
						onClick={handlePublish}
						disabled={loading}
						className="bg-[#6A6D57] hover:bg-[#585a48] text-white px-6 py-2.5 rounded-lg font-bold transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50"
					>
						<ImageIcon size={18} />
						{loading ? "Publishing..." : "Publish"}
					</button>
				</div>

				{/* Form */}
				<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 space-y-6">
					{/* Main Blog Title */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Add Main Blog Title
						</label>
						<input
							type="text"
							value={mainData.title}
							onChange={(e) =>
								setMainData({
									...mainData,
									title: e.target.value,
								})
							}
							placeholder="Enter title"
							className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57]"
						/>
					</div>

					{/* Subtitle */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Add subtitle (if any)
						</label>
						<input
							type="text"
							value={mainData.subline}
							onChange={(e) =>
								setMainData({
									...mainData,
									subline: e.target.value,
								})
							}
							placeholder="Enter title"
							className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57]"
						/>
					</div>

					{/* Category */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Add Category
						</label>
						<div className="relative">
							<select
								value={mainData.category}
								onChange={(e) =>
									setMainData({
										...mainData,
										category: e.target.value,
									})
								}
								className="appearance-none w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57] bg-white"
							>
								<option value="">Chose category</option>
								<option value="STYLE_&_SELF">
									Style & Self
								</option>
								<option value="FASHION">Fashion</option>
								<option value="LIFESTYLE">Lifestyle</option>
							</select>
							<ChevronDown
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"
								size={16}
							/>
						</div>
					</div>

					{/* Tags */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Add Tags
						</label>
						<div className="flex gap-2 mb-3">
							<input
								type="text"
								value={newTag}
								onChange={(e) => setNewTag(e.target.value)}
								onKeyPress={(e) =>
									e.key === "Enter" && handleAddTag()
								}
								placeholder="Enter tags"
								className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57]"
							/>
							<button
								onClick={handleAddTag}
								className="px-6 py-3 bg-[#6A6D57] hover:bg-[#585a48] text-white rounded-lg font-medium transition-colors flex items-center gap-2"
							>
								<Plus size={18} />
								Add
							</button>
						</div>
						<div className="flex flex-wrap gap-2">
							{mainData.tags.map((tag, index) => (
								<span
									key={index}
									className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-sm"
								>
									{tag}
									<button
										onClick={() => handleRemoveTag(tag)}
										className="text-red-500 hover:text-red-700"
									>
										<X size={14} />
									</button>
								</span>
							))}
						</div>
					</div>

					{/* Add Image */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Add Image
						</label>
						<div
							onClick={() =>
								document.getElementById("main-image").click()
							}
							className="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center hover:border-[#6A6D57] transition-colors cursor-pointer relative"
						>
							<input
								id="main-image"
								type="file"
								accept="image/*"
								onChange={handleMainImageChange}
								className="hidden"
							/>
							{mainData.imagePreview ? (
								<div className="absolute inset-0 p-2">
									<img
										src={mainData.imagePreview}
										alt="preview"
										className="w-full h-full object-contain rounded-lg"
									/>
								</div>
							) : (
								<div className="flex flex-col items-center justify-center gap-3">
									<ImageIcon
										size={40}
										className="text-gray-400"
									/>
									<span className="text-gray-500 font-medium">
										Browse Images
									</span>
								</div>
							)}
						</div>
					</div>

					{/* Blog Description */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Blog Description
						</label>
						<textarea
							rows={6}
							value={mainData.description}
							onChange={(e) =>
								setMainData({
									...mainData,
									description: e.target.value,
								})
							}
							placeholder="Enter description"
							className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57] resize-none"
						/>
					</div>

					{/* Sub Sections */}
					<div className="space-y-4">
						<h3 className="text-lg font-bold text-gray-800">
							Sub Sections
						</h3>
						{subSections.map((sub, index) => (
							<div
								key={index}
								className="p-4 border border-gray-200 rounded-xl space-y-4 relative bg-gray-50/30"
							>
								<button
									onClick={() => removeSubSection(index)}
									className="absolute top-4 right-4 text-red-400 hover:text-red-600"
								>
									<Trash2 size={18} />
								</button>
								<div>
									<label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
										Title
									</label>
									<input
										type="text"
										value={sub.title}
										onChange={(e) =>
											handleSubSectionChange(
												index,
												"title",
												e.target.value
											)
										}
										placeholder="Step title"
										className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#6A6D57]"
									/>
								</div>
								<div>
									<label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
										Description
									</label>
									<textarea
										value={sub.description}
										onChange={(e) =>
											handleSubSectionChange(
												index,
												"description",
												e.target.value
											)
										}
										placeholder="Detailed description..."
										className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#6A6D57] resize-none"
										rows={3}
									/>
								</div>
								<div>
									<label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
										Image
									</label>
									<div
										onClick={() =>
											document
												.getElementById(
													`sub-image-${index}`
												)
												.click()
										}
										className="border border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer bg-white"
									>
										<input
											id={`sub-image-${index}`}
											type="file"
											accept="image/*"
											className="hidden"
											onChange={(e) =>
												handleSubSectionImageChange(
													index,
													e
												)
											}
										/>
										{sub.imagePreview ? (
											<img
												src={sub.imagePreview}
												alt="sub-preview"
												className="h-20 mx-auto object-contain rounded"
											/>
										) : (
											<span className="text-xs text-gray-400">
												Click to upload image
											</span>
										)}
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Add Sub Section */}
					<button
						onClick={addSubSection}
						className="w-full py-4 border-2 border-dashed border-gray-200 rounded-lg text-gray-500 font-medium hover:border-[#6A6D57] hover:text-[#6A6D57] transition-colors flex items-center justify-center gap-2"
					>
						<Plus size={18} />
						Add Sub Section
					</button>
				</div>

				{/* Back Button */}
				<button
					onClick={() => setShowForm(false)}
					className="text-gray-600 hover:text-gray-800 font-medium"
				>
					← Back to Editorial List
				</button>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold text-[#1B1B1B]">
					Editorial Management
				</h1>
				<button
					onClick={() => setShowForm(true)}
					className="bg-[#6A6D57] hover:bg-[#585a48] text-white px-6 py-2.5 rounded-lg font-bold transition-colors shadow-sm flex items-center gap-2"
				>
					<Plus size={18} />
					Add New Editorial
				</button>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{stats.map((stat, index) => (
					<div
						key={index}
						className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
					>
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-500 mb-1">
									{stat.title}
								</p>
								<h3 className="text-3xl font-bold text-[#1B1B1B]">
									{stat.value}
								</h3>
							</div>
							<div
								className={`p-3 rounded-xl ${stat.bg} bg-opacity-50`}
							>
								{stat.icon}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Editorial Cards Grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{Array.isArray(editorials) &&
					editorials.map((editorial) => (
						<div
							key={editorial.id}
							className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
						>
							{/* Image */}
							<div className="relative h-48 bg-gray-100">
								<img
									src={
										editorial.image
											? editorial.image.startsWith("http")
												? editorial.image
												: axiosClient.defaults.baseURL +
												  editorial.image
											: "https://via.placeholder.com/400x300?text=No+Image"
									}
									alt={editorial.title}
									className="w-full h-full object-cover"
								/>
								{editorial.isPinned && (
									<button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
										<Pin
											size={18}
											className="text-gray-700"
										/>
									</button>
								)}
							</div>

							{/* Content */}
							<div className="p-5 space-y-3">
								<div className="flex items-center justify-between">
									<h3 className="text-lg font-bold text-[#1B1B1B]">
										{editorial.title}
									</h3>
									<span className="px-2 py-0.5 bg-[#6A6D57]/10 text-[#6A6D57] rounded text-[10px] font-bold uppercase tracking-wider">
										{editorial.category}
									</span>
								</div>
								<p className="text-sm text-gray-600 line-clamp-3">
									{editorial.description}
								</p>
								<div className="flex items-center justify-between pt-2 border-t border-gray-100">
									<span className="text-xs text-gray-400">
										Published
									</span>
									<span className="text-sm font-medium text-gray-700">
										{editorial.published_at
											? new Date(
													editorial.published_at
											  ).toLocaleDateString("en-US", {
													day: "numeric",
													month: "short",
													year: "numeric",
											  })
											: "Recently"}
									</span>
								</div>
							</div>
						</div>
					))}
			</div>

			{/* Carousel Management */}
			<div>
				<h2 className="text-xl font-bold text-[#1B1B1B] mb-4">
					Carousel Management{" "}
					<span className="text-sm font-normal text-gray-500">
						(max 5 image)
					</span>
				</h2>

				<div className="flex gap-4 overflow-x-auto pb-2">
					{Array.isArray(editorials) &&
						editorials
							.filter((e, idx) => e.is_carousel || idx < 4)
							.map((editorial, index) => (
								<div
									key={index}
									className="relative flex-shrink-0 w-48 h-48 rounded-xl overflow-hidden group"
								>
									<img
										src={
											editorial.image
												? editorial.image.startsWith(
														"http"
												  )
													? editorial.image
													: axiosClient.defaults
															.baseURL +
													  editorial.image
												: "https://via.placeholder.com/300"
										}
										alt={`Carousel ${index + 1}`}
										className="w-full h-full object-cover"
									/>
									<button className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
										<X size={16} />
									</button>
								</div>
							))}

					{/* Add Image Button */}
					<div className="flex-shrink-0 w-48 h-48 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[#6A6D57] transition-colors cursor-pointer">
						<ImageIcon size={32} className="text-gray-400" />
						<span className="text-sm text-gray-500 font-medium">
							+ Add Image
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Editorial;
