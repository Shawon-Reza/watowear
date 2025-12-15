import { Upload, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { IoMdImage } from "react-icons/io";

const AddNewItemModal = ({ isOpen, onClose, onSubmit, editItem }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		setValue,
		watch,
	} = useForm({
		defaultValues: editItem || {},
	});

	if (!isOpen) return null;

	const handleFormSubmit = (data) => {
		onSubmit(data);
		reset();
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-xl shadow-xl w-full max-w-[600px] overflow-hidden animate-in fade-in zoom-in duration-200">
				{/* Header */}
				<div className="flex items-center justify-between p-6 pb-2">
					<h2 className="text-xl font-bold text-[#1B1B1B] flex items-center gap-2">
						{editItem ? "Edit Item" : "Add New Item"}
						{editItem && (
							<span className="text-gray-400 text-sm font-normal">
								(Editing)
							</span>
						)}
					</h2>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 transition-colors"
					>
						{/* Edit icon in design top right? No, standard close usually. Design shows Edit icon in header title area maybe? Keeping standard close for UX. */}
						{/* Actually image 3 shows a Pencil icon on top right corner of the Modal Title area? */}
						{/* Let's assume the Pencil is just decorative or indicating "Edit Mode" if editing. */}
						{/* I will use X for close. */}
						{/* Wait, the image 3 shows a Pencil icon on the top right. It might be the "Close" button styled as pencil?? No that makes no sense. */}
						{/* It might be valid "Edit" icon. But usually top right is close. I'll stick to simple layout. */}
						<div className="p-1 hover:bg-gray-100 rounded-full">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="lucide lucide-pencil text-gray-400"
							>
								<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
								<path d="m15 5 4 4" />
							</svg>
						</div>
					</button>
				</div>

				<form
					onSubmit={handleSubmit(handleFormSubmit)}
					className="p-6 pt-4 space-y-5"
				>
					{/* Item Name */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							Item Name
						</label>
						<input
							{...register("name", {
								required: "Item name is required",
							})}
							placeholder="T-shirt"
							className={`w-full px-4 py-3 rounded-lg border ${
								errors.name
									? "border-red-500"
									: "border-gray-200"
							} focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57] transition-all text-gray-700 placeholder:text-gray-400`}
						/>
						{errors.name && (
							<p className="text-red-500 text-xs mt-1">
								{errors.name.message}
							</p>
						)}
					</div>

					{/* Category & Tag Row */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">
								Category
							</label>
							<input
								{...register("category", {
									required: "Category is required",
								})}
								placeholder="Casual"
								className={`w-full px-4 py-3 rounded-lg border ${
									errors.category
										? "border-red-500"
										: "border-gray-200"
								} focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57] transition-all text-gray-700 placeholder:text-gray-400`}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">
								Tag
							</label>
							<input
								{...register("tag")}
								placeholder="Top"
								className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57] transition-all text-gray-700 placeholder:text-gray-400"
							/>
						</div>
					</div>

					{/* Upload Image */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1.5">
							Upload Image
						</label>
						<div
							className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer"
							onClick={() =>
								document
									.getElementById("image-upload-modal")
									.click()
							}
						>
							<div className="w-12 h-12 mb-3 text-gray-300">
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M12 13v-8l-4 4m4-4 4 4" />
									<path d="M20.4 15a6 6 0 0 1-7.4 6 6 6 0 0 1-7.4-6" />
								</svg>
							</div>
							<p className="text-sm text-gray-500 font-medium">
								Drag and drop files here, or click to browse
							</p>
							<p className="text-xs text-gray-400 mt-1">
								Supports JPG, PNG
							</p>
							<input
								type="file"
								accept="image/*"
								{...register("image")}
								className="hidden"
								id="image-upload-modal"
							/>
						</div>
					</div>

					{/* Footer Buttons */}
					<div className="space-y-3 pt-2">
						<button
							type="button"
							onClick={() =>
								document
									.getElementById("image-upload-modal")
									.click()
							}
							className="w-full py-3 rounded-lg border border-[#6A6D57] text-[#6A6D57] font-bold hover:bg-[#6A6D57]/5 transition-colors flex items-center justify-center gap-2"
						>
							<IoMdImage size={20} />
							Upload Image
						</button>
						<button
							type="submit"
							className="w-full py-3 rounded-lg bg-[#6A6D57] text-white font-bold hover:bg-[#585a48] transition-colors shadow-lg shadow-[#6A6D57]/20"
						>
							Add
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddNewItemModal;
