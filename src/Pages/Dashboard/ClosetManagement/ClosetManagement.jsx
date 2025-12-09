import { useEffect, useRef, useState } from "react";
import CategoryTags from "./CategoryTags";
import ClosetManagementTable from "./ClosetManagementTable";
import FashionManagement from "./FashionManagement";

export default function ClosetManagement() {
	const [items, setItems] = useState([
		{
			id: "01",
			item: "Blue Denim Jacket",
			category: "Outerwear",
			tags: "Casual, Spring",
			uploadedBy: "Emma Johnson",
			status: "Approved",
			dateAdded: "2023-10-15",
		},
		{
			id: "02",
			item: "Black Leather Boots",
			category: "Footwear",
			tags: "Winter, Formal",
			uploadedBy: "Michael Chen",
			status: "Approved",
			dateAdded: "2023-10-12",
		},
		{
			id: "03",
			item: "White Cotton T-Shirt",
			category: "Tops",
			tags: "Basic, Casual",
			uploadedBy: "Sophia Rodriguez",
			status: "Approved",
			dateAdded: "2023-10-10",
		},
		{
			id: "04",
			item: "Floral Summer Dress",
			category: "Dresses",
			tags: "Summer, Floral",
			uploadedBy: "Olivia Martinez",
			status: "Rejected",
			dateAdded: "2023-10-18",
		},
		{
			id: "05",
			item: "Grey Wool Sweater",
			category: "Knitwear",
			tags: "Winter, Warm",
			uploadedBy: "Noah Brown",
			status: "Approved",
			dateAdded: "2023-10-05",
		},
		{
			id: "06",
			item: "Ripped Skinny Jeans",
			category: "Bottoms",
			tags: "Casual, Trendy",
			uploadedBy: "James Wilson",
			status: "Rejected",
			dateAdded: "2023-10-17",
		},
		// Additional items for demonstration
		{
			id: "07",
			item: "Red Hoodie",
			category: "Tops",
			tags: "Casual, Fall",
			uploadedBy: "Emma Johnson",
			status: "Approved",
			dateAdded: "2023-09-28",
		},
		{
			id: "08",
			item: "Brown Leather Jacket",
			category: "Outerwear",
			tags: "Winter, Formal",
			uploadedBy: "Michael Chen",
			status: "Approved",
			dateAdded: "2023-09-25",
		},
		{
			id: "09",
			item: "Green Sneakers",
			category: "Footwear",
			tags: "Casual, Sport",
			uploadedBy: "Sophia Rodriguez",
			status: "Approved",
			dateAdded: "2023-09-20",
		},
		{
			id: "10",
			item: "Yellow Blouse",
			category: "Tops",
			tags: "Summer, Casual",
			uploadedBy: "Olivia Martinez",
			status: "Rejected",
			dateAdded: "2023-09-15",
		},
		{
			id: "11",
			item: "Black Skirt",
			category: "Bottoms",
			tags: "Formal, Winter",
			uploadedBy: "Noah Brown",
			status: "Approved",
			dateAdded: "2023-09-10",
		},
		{
			id: "12",
			item: "Blue Scarf",
			category: "Accessories",
			tags: "Winter, Casual",
			uploadedBy: "James Wilson",
			status: "Approved",
			dateAdded: "2023-09-05",
		},
		{
			id: "13",
			item: "Pink Cap",
			category: "Accessories",
			tags: "Summer, Trendy",
			uploadedBy: "Emma Johnson",
			status: "Rejected",
			dateAdded: "2023-08-30",
		},
		{
			id: "14",
			item: "White Sneakers",
			category: "Footwear",
			tags: "Casual, All-Season",
			uploadedBy: "Michael Chen",
			status: "Approved",
			dateAdded: "2023-08-25",
		},
		{
			id: "15",
			item: "Orange Dress",
			category: "Dresses",
			tags: "Summer, Casual",
			uploadedBy: "Sophia Rodriguez",
			status: "Approved",
			dateAdded: "2023-08-20",
		},
	]);

	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("All Status");
	const [page, setPage] = useState(1);
	const itemsPerPage = 10;
	const loaderRef = useRef(null);

	const filteredItems = items.filter((item) => {
		const matchesSearch =
			item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus =
			filterStatus === "All Status" || item.status === filterStatus;
		return matchesSearch && matchesStatus;
	});

	const visibleItems = filteredItems.slice(0, page * itemsPerPage);
	const hasMore = visibleItems.length < filteredItems.length;

	useEffect(() => {
		setPage(1);
	}, [searchTerm, filterStatus]);

	// Set up intersection observer for infinite scroll
	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && hasMore) {
				setPage((prev) => prev + 1);
			}
		});

		if (loaderRef.current) {
			observer.observe(loaderRef.current);
		}

		return () => {
			if (loaderRef.current) {
				observer.unobserve(loaderRef.current);
			}
		};
	}, [hasMore]);

	// Delete item
	const deleteItem = (id) => {
		setItems((prev) => prev.filter((item) => item.id !== id));
	};

	return (
		<div className="">
			<div className="mx-auto space-y-4 ">
				{/* Header */}
				<div className="flex items-center justify-between mb-8">
					<h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#6A6D57] via-[#5A5D4A] to-[#4A4D3A] bg-clip-text text-transparent">
						Closet Management ( user )
					</h1>
				</div>

				<section className="max-h-[calc(100vh-200px)] overflow-auto">
					<ClosetManagementTable></ClosetManagementTable>
				</section>

				{/* category & tags */}
			</div>
			<div className=" mt-16">
				<h1 className="mb-5 text-3xl font-extrabold bg-gradient-to-r from-[#6A6D57] via-[#5A5D4A] to-[#4A4D3A] bg-clip-text text-transparent">
					Categories & Tags Management
				</h1>
				<CategoryTags />
			</div>

			<div className=" mt-16">
				<h1 className="mb-5 text-3xl font-extrabold bg-gradient-to-r from-[#6A6D57] via-[#5A5D4A] to-[#4A4D3A] bg-clip-text text-transparent">
					Fashion Library Management ( AI ){" "}
				</h1>
				<FashionManagement />
			</div>
		</div>
	);
}
