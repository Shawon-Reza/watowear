import { useState } from "react";
import {
	Plus,
	Tag,
	Calendar,
	Clock,
	X,
	ChevronDown,
	Image as ImageIcon,
	Pin,
} from "lucide-react";
import { PiNotepad } from "react-icons/pi";

const Editorial = () => {
	const [showForm, setShowForm] = useState(false);
	const [tags, setTags] = useState(["Fashion", "Women"]);
	const [newTag, setNewTag] = useState("");

	// Mock data for stats
	const stats = [
		{
			title: "Total Editorial",
			value: "10",
			icon: <PiNotepad size={24} className="text-blue-600" />,
			bg: "bg-blue-100",
		},
		{
			title: "Recent Editorial",
			value: "2",
			icon: <PiNotepad size={24} className="text-gray-600" />,
			bg: "bg-gray-200",
		},
		{
			title: "Old Editorial",
			value: "8",
			icon: <PiNotepad size={24} className="text-yellow-600" />,
			bg: "bg-yellow-100",
		},
	];

	// Mock data for editorial cards
	const editorials = [
		{
			id: 1,
			title: "Meet the Makers",
			description:
				"How do you create compelling presentations that wow your colleagues and impress your managers?",
			image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop",
			published: "20 Jan 2025",
			isPinned: true,
		},
		{
			id: 2,
			title: "Colour Slides",
			description:
				"How do you create compelling presentations that wow your colleagues and impress your managers?",
			image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop",
			published: "20 Jan 2025",
			isPinned: false,
		},
		{
			id: 3,
			title: "Confidence",
			description:
				"How do you create compelling presentations that wow your colleagues and impress your managers?",
			image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop",
			published: "20 Jan 2025",
			isPinned: false,
		},
	];

	// Mock carousel images
	const carouselImages = [
		"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop",
		"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&h=300&fit=crop",
		"https://images.unsplash.com/photo-1558769132-cb1aea564c8f?w=300&h=300&fit=crop",
		"https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop",
	];

	const handleAddTag = () => {
		if (newTag.trim()) {
			setTags([...tags, newTag.trim()]);
			setNewTag("");
		}
	};

	const handleRemoveTag = (index) => {
		setTags(tags.filter((_, i) => i !== index));
	};

	if (showForm) {
		return (
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-bold text-[#1B1B1B]">
						Add New Editorial
					</h1>
					<button className="bg-[#6A6D57] hover:bg-[#585a48] text-white px-6 py-2.5 rounded-lg font-bold transition-colors shadow-sm flex items-center gap-2">
						<ImageIcon size={18} />
						Publish
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
							<select className="appearance-none w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57] bg-white">
								<option value="">Chose category</option>
								<option value="fashion">Fashion</option>
								<option value="lifestyle">Lifestyle</option>
								<option value="beauty">Beauty</option>
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
							{tags.map((tag, index) => (
								<span
									key={index}
									className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-sm"
								>
									{tag}
									<button
										onClick={() => handleRemoveTag(index)}
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
						<div className="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center hover:border-[#6A6D57] transition-colors cursor-pointer">
							<div className="flex flex-col items-center justify-center gap-3">
								<ImageIcon
									size={40}
									className="text-gray-400"
								/>
								<span className="text-gray-500 font-medium">
									Browse Images
								</span>
							</div>
						</div>
					</div>

					{/* Blog Description */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Blog Description
						</label>
						<textarea
							rows={6}
							placeholder="Enter description"
							className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57] resize-none"
						/>
					</div>

					{/* Schedule Post */}
					<div>
						<label className="flex items-center gap-2 mb-4">
							<input
								type="checkbox"
								className="w-4 h-4 text-[#6A6D57] border-gray-300 rounded focus:ring-[#6A6D57]"
							/>
							<span className="text-sm font-medium text-gray-700">
								Schedule Post
							</span>
						</label>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{/* Date */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Date
								</label>
								<div className="relative">
									<input
										type="text"
										placeholder="select date"
										className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57]"
									/>
									<Calendar
										className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
										size={18}
									/>
								</div>
							</div>

							{/* Time */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Time
								</label>
								<div className="flex gap-3">
									<div className="flex items-center border border-gray-200 rounded-lg overflow-hidden flex-1">
										<div className="flex flex-col border-r border-gray-200">
											<button className="px-2 py-0.5 hover:bg-gray-50 text-gray-400">
												<ChevronDown
													size={12}
													className="rotate-180"
												/>
											</button>
											<button className="px-2 py-0.5 hover:bg-gray-50 text-gray-400">
												<ChevronDown size={12} />
											</button>
										</div>
										<input
											type="text"
											defaultValue="10"
											className="flex-1 px-3 py-2 text-center text-sm focus:outline-none"
										/>
									</div>
									<span className="flex items-center text-gray-400">
										:
									</span>
									<div className="flex gap-2">
										<button className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium">
											AM
										</button>
										<button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200">
											PM
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Add Sub Section */}
					<button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-lg text-gray-500 font-medium hover:border-[#6A6D57] hover:text-[#6A6D57] transition-colors flex items-center justify-center gap-2">
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
				{editorials.map((editorial) => (
					<div
						key={editorial.id}
						className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
					>
						{/* Image */}
						<div className="relative h-48 bg-gray-100">
							<img
								src={editorial.image}
								alt={editorial.title}
								className="w-full h-full object-cover"
							/>
							{editorial.isPinned && (
								<button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
									<Pin size={18} className="text-gray-700" />
								</button>
							)}
						</div>

						{/* Content */}
						<div className="p-5 space-y-3">
							<h3 className="text-lg font-bold text-[#1B1B1B]">
								{editorial.title}
							</h3>
							<p className="text-sm text-gray-600 line-clamp-3">
								{editorial.description}
							</p>
							<div className="flex items-center justify-between pt-2 border-t border-gray-100">
								<span className="text-xs text-gray-400">
									Published
								</span>
								<span className="text-sm font-medium text-gray-700">
									{editorial.published}
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
					{carouselImages.map((image, index) => (
						<div
							key={index}
							className="relative flex-shrink-0 w-48 h-48 rounded-xl overflow-hidden group"
						>
							<img
								src={image}
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
