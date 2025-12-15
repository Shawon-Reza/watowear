import { Tags, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdImage } from "react-icons/io";
import { Link } from "react-router-dom";

const FashionManagement = () => {
	const [showModal, setShowModal] = useState(null);
	const [deleteItemId, setDeleteItemId] = useState(null);
	const [items, setItems] = useState([
		{
			id: 1,
			name: "T-Shirt",
			category: "Casual",
			tag: "Top",
			image: "https://poshgarments.com/wp-content/uploads/2021/09/Mens-Shirt-MWS0001.jpg",
		},
		{
			id: 2,
			name: "T-Shirt",
			category: "Casual",
			tag: "Top",
			image: "https://www.grog.eu/wp-content/uploads/2020/09/square-round-neck-white-black-grog-classic-logo-tshirt-EPT-03.png",
		},
		{
			id: 3,
			name: "T-Shirt",
			category: "Casual",
			tag: "Top",
			image: "https://shop.adarbepari.com/wp-content/uploads/2023/11/coral-sea-shell-printed-cuban-collar-shirt.jpg",
		},
		{
			id: 4,
			name: "T-Shirt",
			category: "Casual",
			tag: "Top",
			image: "https://img.drz.lazcdn.com/static/bd/p/1febf15fb4e4a3f102317d764198cf5c.jpg_720x720q80.jpg",
		},
	]);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const handleEdit = (item) => {
		setShowModal("edit");
		console.log(item);
	};

	const handleRemove = (id) => {
		setItems((prevItems) => prevItems.filter((item) => item.id !== id));
		setDeleteItemId(null); // Close the modal after deletion
	};

	const openDeleteModal = (id) => {
		setDeleteItemId(id);
	};

	const closeDeleteModal = () => {
		setDeleteItemId(null);
	};

	const onSubmit = (data) => {
		console.log(data);
		setShowModal(null);
		reset();
	};

	return (
		<div className=" ">
			<div className=" mx-auto">
				<div className="pb-6">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-8">
						{items.map((item) => (
							<div
								key={item.id}
								className="relative bg-white shadow drop-shadow-lg rounded-[20px] overflow-hidden"
							>
								<figure className="aspect-square bg-[#F9FAFB] p-4 flex items-center justify-center">
									<img
										src={item.image}
										alt={item.name}
										className="object-contain max-h-full"
									/>
								</figure>
								<div className="card-body p-4 ">
									<div className="flex items-center justify-between mb-3">
										<h2 className="text-lg font-bold text-[#4A4A4A]">
											{item.name}
										</h2>
										<div className="flex items-center gap-1 bg-[#F3F4F6] px-2 py-1 rounded-full text-xs font-semibold text-[#374151]">
											<Tags
												size={12}
												className="text-[#6B7280]"
											/>
											{item.category}
										</div>
									</div>

									<div className="flex items-center justify-between gap-3 mt-2">
										<button
											onClick={() => handleEdit(item)}
											className="flex-1 rounded-lg px-4 py-2 text-white bg-[#6A6D57] hover:bg-[#585a48] text-sm font-bold shadow-sm transition-colors"
										>
											Edit
										</button>
										<button
											onClick={() =>
												openDeleteModal(item.id)
											}
											className="flex-1 rounded-lg px-4 py-2 text-white bg-[#FF6B6B] hover:bg-[#ff5252] text-sm font-bold shadow-sm transition-colors"
										>
											Remove
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{deleteItemId && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
						<div className="bg-white p-6 text-[#1B1B1B] rounded-lg shadow-xl w-full max-w-[500px] mx-4">
							<div className="p-6">
								<h3 className="font-extrabold text-center text-2xl">
									Remove from Closet list
								</h3>
								<p className="text-center text-lg font-extrabold py-3 text-[#E43636]">
									Are you sure you want to remove this item?
								</p>
								<div className="flex justify-end gap-2 py-3">
									<button
										onClick={closeDeleteModal}
										className="px-4 basis-5/12 py-2 border-2 boder-[#475467] text-gray-700 rounded-lg hover:bg-gray-100"
									>
										Cancel
									</button>
									<button
										onClick={() =>
											handleRemove(deleteItemId)
										}
										className="px-4 basis-5/12 py-2 hover:bg-red-600 text-white rounded-lg bg-[#FF6361]"
									>
										Remove
									</button>
								</div>
							</div>
						</div>
					</div>
				)}

				{showModal && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
						<div className="bg-white rounded-lg shadow-xl w-full max-w-[700px] mx-4">
							<div className="flex items-center justify-between p-6 border-b border-gray-200">
								<h2 className="text-lg font-semibold text-gray-900">
									{showModal === "add"
										? "Add New Item"
										: "Edit Item"}
								</h2>
								<div className="flex items-center space-x-2">
									<button
										onClick={() => {
											setShowModal(null);
											reset();
										}}
										className="text-gray-400 hover:text-gray-600"
									>
										<X size={20} />
									</button>
								</div>
							</div>

							<form
								onSubmit={handleSubmit(onSubmit)}
								className="p-6 space-y-4"
							>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Item Name
									</label>
									<input
										{...register("name", {
											required: "Item name is required",
										})}
										placeholder="T-shirt"
										className={`w-full px-3 py-2 border   ${
											errors.name
												? "border-red-500"
												: "border-gray-300"
										} rounded-lg`}
									/>
									{errors.name && (
										<p className="text-red-500 text-xs mt-1">
											{errors.name.message}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Category
									</label>
									<div className="flex space-x-4">
										<input
											{...register("category", {
												required:
													"Category is required",
											})}
											placeholder="Casual"
											className={`w-full px-3 py-2 border   ${
												errors.name
													? "border-red-500"
													: "border-gray-300"
											} rounded-lg`}
										/>
										<select
											{...register("tag")}
											className="px-3 py-2 border border-gray-300 rounded-lg  "
										>
											<option value="Top">Top</option>
											<option value="Bottom">
												Bottom
											</option>
											<option value="Dress">Dress</option>
											<option value="Outerwear">
												Outerwear
											</option>
										</select>
									</div>
									{errors.category && (
										<p className="text-red-500 text-xs mt-1">
											{errors.category.message}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Upload Image
									</label>
									<div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
										<p className="text-sm text-gray-600 mb-2">
											Drag and drop files here, or click
											to browse
										</p>
										<p className="text-xs text-gray-500">
											Supports: JPG, PNG
										</p>
										<input
											type="file"
											accept="image/*"
											{...register("image")}
											className="hidden"
											id="image-upload"
										/>
									</div>
									<button
										type="button"
										onClick={() =>
											document
												.getElementById("image-upload")
												.click()
										}
										className="w-full mt-3 border border-[#6A6D57] text-[#6A6D57] font-bold py-2 rounded-lg  transition-colors flex items-center justify-center space-x-2"
									>
										<IoMdImage size={24} />
										<span>Upload Image</span>
									</button>
								</div>

								<div className=" py-4 border-t border-gray-200">
									<button
										type="submit"
										className="w-full bg-[#6A6D57] hover:bg-[#585a48] text-white py-3 rounded-lg  transition-colors font-medium"
									>
										{showModal === "add" ? "Add" : "Update"}
									</button>
								</div>
							</form>
						</div>
					</div>
				)}

				<Link
					to="/admin/fashion_management"
					className="text-right flex items-center justify-end"
				>
					<button className="bg-white hover:bg-gray-50 shadow drop-shadow-lg shadow-gray-200 text-[#6A6D57] px-8 py-2 rounded-[12px] hover:cursor-pointer font-extrabold">
						View All
					</button>
				</Link>
			</div>
		</div>
	);
};

export default FashionManagement;
