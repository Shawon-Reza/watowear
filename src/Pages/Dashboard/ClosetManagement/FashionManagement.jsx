import { Tags } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const FashionManagement = () => {
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

	return (
		<div className="">
			<div className="mx-auto">
				{/* Tabs and Search Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
					<div className="flex items-center gap-6 border-b border-gray-200 w-full sm:w-auto">
						<button className="pb-2 text-sm font-semibold text-[#6A6D57] border-b-2 border-[#6A6D57]">
							All Items
						</button>
						<button className="pb-2 text-sm font-medium text-gray-500 hover:text-gray-700">
							Searched
						</button>
					</div>
					<div className="relative">
						<span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<svg
								className="h-4 w-4 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</span>
						<input
							type="text"
							placeholder="Search..."
							className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#6A6D57] w-full sm:w-64"
						/>
					</div>
				</div>

				<div className="pb-6">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-8">
						{items.map((item) => (
							<div
								key={item.id}
								className="relative bg-white shadow-sm drop-shadow-md rounded-[20px] overflow-hidden group hover:shadow-lg transition-shadow duration-300"
							>
								<figure className="aspect-[4/5] bg-[#F9FAFB] p-6 flex items-center justify-center relative">
									{/* Hanger Image Mockup Style */}
									<img
										src={item.image}
										alt={item.name}
										className="object-contain w-full h-full drop-shadow-xl"
									/>
								</figure>
								<div className="p-4">
									<div className="flex items-center justify-between mb-4">
										<h2 className="text-lg font-bold text-[#1B1B1B]">
											{item.name}
										</h2>
										<div className="flex items-center gap-1 bg-white border border-gray-100 px-2 py-1 rounded-full text-[10px] font-medium text-gray-500 shadow-sm">
											<Tags
												size={10}
												className="text-gray-400"
											/>
											{item.category}
										</div>
									</div>

									<div className="grid grid-cols-2 gap-3">
										<button className="flex items-center justify-center px-4 py-1.5 bg-[#6A6D57] hover:bg-[#595b49] text-white text-xs font-semibold rounded-md transition-colors">
											Edit
										</button>
										<button className="flex items-center justify-center px-4 py-1.5 bg-[#FF6B6B] hover:bg-[#ff5252] text-white text-xs font-semibold rounded-md transition-colors">
											Remove
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<Link
					to="/admin/fashion_management"
					className="text-right flex items-center justify-end"
				>
					<button className="bg-white hover:bg-gray-50 text-[#6A6D57] px-6 py-2 rounded-lg text-sm font-semibold shadow-sm border border-gray-100 transition-all">
						View All
					</button>
				</Link>
			</div>
		</div>
	);
};

export default FashionManagement;
