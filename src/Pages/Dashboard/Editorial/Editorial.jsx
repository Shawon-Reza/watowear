import {
	Plus,
	Tag,
	Calendar,
	Clock,
	X,
	ChevronDown,
	ChevronUp,
	Image as ImageIcon,
	Pin,
	Trash2,
	Edit,
	Check,
} from "lucide-react";
import { PiNotepad, PiClock } from "react-icons/pi";
import { useEffect, useState } from "react";
import useEditorialStore from "../../../store/useEditorialStore";
import axiosClient from "../../../api/axiosClient";

const Editorial = () => {
	const {
		editorials,
		loading,
		error,
		fetchEditorials,
		createEditorial,
		updateEditorial,
	} = useEditorialStore();
	const [showForm, setShowForm] = useState(false);
	const [editingId, setEditingId] = useState(null);

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
		schedule: false,
		date: "",
		time: { hour: 10, minute: 0, period: "AM" },
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
			icon: <PiNotepad size={20} className="text-white" />,
			bg: "bg-[#4B84F1]",
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
			icon: <Check size={20} className="text-white" />,
			bg: "bg-[#656A55]",
		},
		{
			title: "Old Editorial",
			value: (editorials || [])
				.filter((e) => {
					if (!e.published_at) return false;
					const d = new Date(e.published_at);
					const now = new Date();
					const diff = (now - d) / (1000 * 60 * 60 * 24);
					return diff >= 15; // Adjusted to match design context (Recent vs Old)
				})
				.length.toString(),
			icon: <PiClock size={20} className="text-white" />,
			bg: "bg-[#FDB528]",
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

	const handleEdit = (editorial) => {
		setEditingId(editorial.id);
		setMainData({
			title: editorial.title || "",
			subline: editorial.subline || "",
			category: editorial.category || "",
			description: editorial.description || "",
			status: editorial.status || "published",
			tags: editorial.tags || [],
			image: null,
			imagePreview: editorial.image
				? editorial.image.startsWith("http")
					? editorial.image
					: axiosClient.defaults.baseURL + editorial.image
				: null,
			schedule: editorial.schedule || false,
			date: editorial.date || "",
			time: editorial.time || { hour: 10, minute: 0, period: "AM" },
		});
		setSubSections(
			editorial.sub_sections?.map((sub) => ({
				id: sub.id,
				title: sub.title || "",
				description: sub.description || "",
				image: null,
				imagePreview: sub.image
					? sub.image.startsWith("http")
						? sub.image
						: axiosClient.defaults.baseURL + sub.image
					: null,
			})) || [
				{ title: "", description: "", image: null, imagePreview: null },
			]
		);
		setShowForm(true);
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
			if (sub.id) fd.append(`sub_sections[${index}][id]`, sub.id);
			fd.append(`sub_sections[${index}][order]`, index);
		});

		let res;
		if (editingId) {
			res = await updateEditorial(editingId, fd);
		} else {
			res = await createEditorial(fd);
		}

		if (res.success) {
			setShowForm(false);
			setEditingId(null);
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
				<div className="space-y-1">
					<p className="text-sm text-gray-500 font-medium">
						Hi Admin !
					</p>
					<p className="text-xs text-gray-400">
						Let's make your work easy
					</p>
					<div className="flex items-center justify-between mt-4">
						<h1 className="text-2xl font-bold text-[#1B1B1B]">
							{editingId ? "Edit Editorial" : "Add New Editorial"}
						</h1>
						<button
							onClick={handlePublish}
							disabled={loading}
							className="bg-[#6A6D57] hover:bg-[#585a48] text-white px-8 py-2.5 rounded-lg font-bold transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50"
						>
							<ImageIcon size={18} />
							{loading
								? editingId
									? "Updating..."
									: "Publishing..."
								: "Publish"}
						</button>
					</div>
				</div>

				{/* Form Container */}
				<div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 p-10 space-y-8">
					{/* Main Blog Title */}
					<div className="space-y-2">
						<label className="block text-sm font-bold text-[#1B1B1B]">
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
							className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm placeholder:text-gray-300 focus:outline-none focus:border-[#6A6D57]"
						/>
					</div>

					{/* Subtitle */}
					<div className="space-y-2">
						<label className="block text-sm font-bold text-[#1B1B1B]">
							Add subline ( If any )
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
							className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm placeholder:text-gray-300 focus:outline-none focus:border-[#6A6D57]"
						/>
					</div>

					{/* Category */}
					<div className="space-y-2">
						<label className="block text-sm font-bold text-[#1B1B1B]">
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
								className={`appearance-none w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#6A6D57] bg-white ${
									mainData.category
										? "text-[#1B1B1B]"
										: "text-gray-300"
								}`}
							>
								<option value="">Chose category</option>
								<option value="LATEST">Latest</option>
								<option value="STYLE_&_SELF">
									Style & Self
								</option>
								<option value="MINDFUL_FASHION_&_SUSTAINABILITY">
									Mindful Fashion & Sustainability
								</option>
								<option value="CLOSET_CURATION">
									Closet Curation
								</option>
								<option value="INSPIRATION_&_STORIES">
									Inspiration & Stories
								</option>
								<option value="HOW_TO_&_FEATURE_GUIDES">
									How-to & Feature Guides
								</option>
								<option value="OTHER">Other</option>
							</select>
							<ChevronDown
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
								size={18}
							/>
						</div>
					</div>

					{/* Tags */}
					<div className="space-y-2">
						<label className="block text-sm font-bold text-[#1B1B1B]">
							Add Tags
						</label>
						<div className="flex gap-2">
							<input
								type="text"
								value={newTag}
								onChange={(e) => setNewTag(e.target.value)}
								onKeyPress={(e) =>
									e.key === "Enter" && handleAddTag()
								}
								placeholder="Enter tags"
								className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-sm placeholder:text-gray-300 focus:outline-none focus:border-[#6A6D57]"
							/>
							<button
								onClick={handleAddTag}
								className="px-6 py-3 bg-[#6A6D57] hover:bg-[#585a48] text-white rounded-lg font-bold transition-colors flex items-center gap-2"
							>
								+ Add
							</button>
						</div>
						<div className="flex flex-wrap gap-3 mt-2">
							{mainData.tags.map((tag, index) => (
								<span
									key={index}
									className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F5F5F5] text-gray-400 rounded-full text-xs font-medium border border-gray-100"
								>
									{tag}
									<button
										onClick={() => handleRemoveTag(tag)}
										className="text-red-400 hover:text-red-600"
									>
										<X size={12} strokeWidth={3} />
									</button>
								</span>
							))}
						</div>
					</div>

					{/* Add Image area */}
					<div className="space-y-2">
						<label className="block text-sm font-bold text-[#1B1B1B]">
							Add Image
						</label>
						<div
							onClick={() =>
								document.getElementById("main-image").click()
							}
							className="border border-gray-100 rounded-[1.5rem] p-12 text-center hover:border-[#6A6D57] transition-all cursor-pointer relative bg-white shadow-sm"
						>
							<input
								id="main-image"
								type="file"
								accept="image/*"
								onChange={handleMainImageChange}
								className="hidden"
							/>
							{mainData.imagePreview ? (
								<div className="absolute inset-0 p-4">
									<img
										src={mainData.imagePreview}
										alt="preview"
										className="w-full h-full object-contain rounded-xl"
									/>
								</div>
							) : (
								<div className="flex flex-col items-center justify-center">
									<div className="w-full py-10 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-3">
										<ImageIcon
											size={32}
											className="text-gray-400"
										/>
										<span className="text-sm text-gray-500 font-bold">
											Browse Images
										</span>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Blog Description */}
					<div className="space-y-2">
						<label className="block text-sm font-bold text-[#1B1B1B]">
							Blog Description
						</label>
						<textarea
							rows={8}
							value={mainData.description}
							onChange={(e) =>
								setMainData({
									...mainData,
									description: e.target.value,
								})
							}
							placeholder="Enter description"
							className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm placeholder:text-gray-300 focus:outline-none focus:border-[#6A6D57] resize-none"
						/>
					</div>

					{/* Schedule Post Section */}
					<div className="space-y-6 pt-4">
						<div className="flex items-center gap-3">
							<input
								type="checkbox"
								id="schedule"
								checked={mainData.schedule}
								onChange={(e) =>
									setMainData({
										...mainData,
										schedule: e.target.checked,
									})
								}
								className="w-4 h-4 rounded border-gray-300 text-[#6A6D57] focus:ring-[#6A6D57]"
							/>
							<label
								htmlFor="schedule"
								className="text-sm font-bold text-[#1B1B1B]"
							>
								Schedule Post
							</label>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
							<div className="space-y-2">
								<label className="block text-sm text-[#1B1B1B] font-medium">
									Date
								</label>
								<div className="relative">
									<input
										type="text"
										value={mainData.date}
										onChange={(e) =>
											setMainData({
												...mainData,
												date: e.target.value,
											})
										}
										placeholder="select date"
										className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm placeholder:text-gray-300 focus:outline-none focus:border-[#6A6D57]"
									/>
									<Calendar
										className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
										size={18}
									/>
								</div>
							</div>

							<div className="space-y-2">
								<label className="block text-sm text-[#1B1B1B] font-medium">
									Time
								</label>
								<div className="flex items-center gap-4">
									<div className="flex items-center gap-2">
										<div className="flex flex-col items-center">
											<button
												onClick={() =>
													setMainData({
														...mainData,
														time: {
															...mainData.time,
															hour:
																(mainData.time
																	.hour %
																	12) +
																1,
														},
													})
												}
												className="text-gray-300 hover:text-gray-500"
											>
												<ChevronUp size={16} />
											</button>
											<span className="text-xl font-medium text-[#6A6D57] tabular-nums">
												{mainData.time.hour
													.toString()
													.padStart(2, "0")}
											</span>
											<button
												onClick={() =>
													setMainData({
														...mainData,
														time: {
															...mainData.time,
															hour:
																mainData.time
																	.hour > 1
																	? mainData
																			.time
																			.hour -
																	  1
																	: 12,
														},
													})
												}
												className="text-gray-300 hover:text-gray-500"
											>
												<ChevronDown size={16} />
											</button>
										</div>
										<span className="text-xl font-medium text-gray-300">
											:
										</span>
										<div className="flex flex-col items-center">
											<button
												onClick={() =>
													setMainData({
														...mainData,
														time: {
															...mainData.time,
															minute:
																(mainData.time
																	.minute +
																	5) %
																60,
														},
													})
												}
												className="text-gray-300 hover:text-gray-500"
											>
												<ChevronUp size={16} />
											</button>
											<span className="text-xl font-medium text-gray-300 tabular-nums">
												{mainData.time.minute
													.toString()
													.padStart(2, "0")}
											</span>
											<button
												onClick={() =>
													setMainData({
														...mainData,
														time: {
															...mainData.time,
															minute:
																mainData.time
																	.minute >= 5
																	? mainData
																			.time
																			.minute -
																	  5
																	: 55,
														},
													})
												}
												className="text-gray-300 hover:text-gray-500"
											>
												<ChevronDown size={16} />
											</button>
										</div>
									</div>

									<div className="flex items-center border border-gray-100 rounded-lg overflow-hidden h-10 ml-2">
										<button
											onClick={() =>
												setMainData({
													...mainData,
													time: {
														...mainData.time,
														period: "AM",
													},
												})
											}
											className={`px-3 h-full text-xs font-bold transition-colors ${
												mainData.time.period === "AM"
													? "bg-[#6A6D57] text-white"
													: "bg-white text-gray-400"
											}`}
										>
											AM
										</button>
										<button
											onClick={() =>
												setMainData({
													...mainData,
													time: {
														...mainData.time,
														period: "PM",
													},
												})
											}
											className={`px-3 h-full text-xs font-bold transition-colors ${
												mainData.time.period === "PM"
													? "bg-[#6A6D57] text-white"
													: "bg-white text-gray-400"
											}`}
										>
											PM
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Sub Sections */}
					<div className="space-y-6">
						{subSections.map((sub, index) => (
							<div
								key={index}
								className="bg-[#F9F9F9] rounded-[1.5rem] border border-gray-100 p-8 space-y-6 relative shadow-sm"
							>
								<button
									onClick={() => removeSubSection(index)}
									className="absolute top-4 right-4 text-red-300 hover:text-red-500 p-2 transition-colors"
								>
									<Trash2 size={20} />
								</button>

								<div className="space-y-2">
									<label className="block text-sm font-bold text-[#1B1B1B]">
										Sub Section Title
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
										placeholder="Enter title"
										className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm placeholder:text-gray-300 focus:outline-none focus:border-[#6A6D57] bg-white"
									/>
								</div>

								<div className="space-y-2">
									<label className="block text-sm font-bold text-[#1B1B1B]">
										Sub Section Image
									</label>
									<div
										onClick={() =>
											document
												.getElementById(
													`sub-image-${index}`
												)
												.click()
										}
										className="border border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#6A6D57] transition-all cursor-pointer bg-white"
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
											<div className="relative h-40">
												<img
													src={sub.imagePreview}
													alt="sub-preview"
													className="h-full mx-auto object-contain rounded-lg"
												/>
											</div>
										) : (
											<div className="flex flex-col items-center gap-2 py-4">
												<ImageIcon
													size={28}
													className="text-gray-400"
												/>
												<span className="text-xs text-gray-400 font-bold">
													Browse Images
												</span>
											</div>
										)}
									</div>
								</div>

								<div className="space-y-2">
									<label className="block text-sm font-bold text-[#1B1B1B]">
										Sub Section Description
									</label>
									<textarea
										rows={4}
										value={sub.description}
										onChange={(e) =>
											handleSubSectionChange(
												index,
												"description",
												e.target.value
											)
										}
										placeholder="Enter description"
										className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm placeholder:text-gray-300 focus:outline-none focus:border-[#6A6D57] bg-white resize-none"
									/>
								</div>
							</div>
						))}
					</div>

					{/* Add Sub Section Button */}
					<button
						onClick={addSubSection}
						className="w-full py-4 border-2 border-[#6A6D57] rounded-xl text-[#6A6D57] font-bold hover:bg-[#6A6D57]/5 transition-all flex items-center justify-center gap-2 mt-4"
					>
						+ Add Sub Section
					</button>
				</div>

				{/* Back Link */}
				<div className="flex justify-start">
					<button
						onClick={() => {
							setShowForm(false);
							setEditingId(null);
						}}
						className="text-gray-400 hover:text-gray-600 font-medium transition-colors"
					>
						← Back to Editorial List
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="space-y-1">
				<p className="text-sm text-gray-500 font-medium">Hi Admin !</p>
				<p className="text-xs text-gray-400">
					Let's make your work easy
				</p>
				<h1 className="text-2xl font-bold text-[#1B1B1B] mt-4">
					Editorial Management
				</h1>
			</div>

			{/* Stats Cards & Add Button */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				{stats.map((stat, index) => (
					<div
						key={index}
						className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4"
					>
						<div
							className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${stat.bg}`}
						>
							{stat.icon}
						</div>
						<div>
							<p className="text-[11px] font-medium text-gray-400">
								{stat.title}
							</p>
							<h3 className="text-lg font-bold text-[#1B1B1B]">
								{stat.value}
							</h3>
						</div>
					</div>
				))}
				<button
					onClick={() => setShowForm(true)}
					className="bg-[#6A6D57] hover:bg-[#585a48] text-white rounded-xl font-bold transition-colors shadow-sm flex items-center justify-center gap-2 h-full py-4 md:py-0"
				>
					<Plus size={18} />
					Add New Editorial
				</button>
			</div>

			{/* Editorial Cards Grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
				{Array.isArray(editorials) &&
					editorials.map((editorial) => (
						<div
							key={editorial.id}
							className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden relative"
						>
							<button className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors">
								<Pin
									size={24}
									className="rotate-45"
									strokeWidth={1}
								/>
							</button>

							{/* Image */}
							<div className="px-6 pt-6">
								<div className="h-64 rounded-[1.5rem] overflow-hidden bg-gray-50">
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
												: "https://via.placeholder.com/400x300?text=No+Image"
										}
										alt={editorial.title}
										className="w-full h-full object-cover"
									/>
								</div>
							</div>

							{/* Content */}
							<div className="p-8 space-y-4">
								<div className="flex items-center justify-between">
									<h3 className="text-xl font-bold text-[#1B1B1B]">
										{editorial.title}
									</h3>
									<button
										onClick={() => handleEdit(editorial)}
										className="p-1.5 text-gray-400 hover:text-[#6A6D57] transition-colors"
									>
										<Edit size={18} />
									</button>
								</div>
								<p className="text-sm text-gray-500 leading-relaxed line-clamp-4">
									{editorial.description}
								</p>
								<div className="flex items-center justify-between pt-4">
									<span className="text-sm font-medium text-gray-400">
										Published
									</span>
									<span className="text-sm font-medium text-gray-700">
										{editorial.published_at
											? new Date(
													editorial.published_at
											  ).toLocaleDateString("en-GB", {
													day: "numeric",
													month: "short",
													year: "numeric",
											  })
											: "20 Jan 2025"}
									</span>
								</div>
							</div>
						</div>
					))}
			</div>

			{/* Carousel Management */}
			<div className="pt-6">
				<h2 className="text-xl font-bold text-[#1B1B1B] mb-6">
					Carousel Management{" "}
					<span className="text-sm font-normal text-gray-400 ml-1">
						(max 5 image)
					</span>
				</h2>

				<div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
					{Array.isArray(editorials) &&
						editorials
							.filter((e, idx) => e.is_carousel || idx < 4)
							.map((editorial, index) => (
								<div
									key={index}
									className="relative flex-shrink-0 w-64 h-64 rounded-[2rem] overflow-hidden group shadow-lg"
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
									<button className="absolute top-3 right-3 p-1 bg-red-500 text-white rounded-full shadow-md z-10 transition-transform active:scale-95 group-hover:scale-110">
										<X size={16} strokeWidth={3} />
									</button>
								</div>
							))}

					{/* Add Image Button */}
					<div className="flex-shrink-0 w-64 h-64 border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center gap-3 hover:border-[#6A6D57] transition-all cursor-pointer bg-white group shadow-sm">
						<div className="p-3 rounded-lg group-hover:bg-[#6A6D57]/5 transition-colors">
							<ImageIcon
								size={28}
								className="text-gray-400 group-hover:text-[#6A6D57]"
							/>
						</div>
						<span className="text-sm text-gray-500 font-bold group-hover:text-[#6A6D57]">
							+ Add Image
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Editorial;
