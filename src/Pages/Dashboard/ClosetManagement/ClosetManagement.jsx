import { useState } from "react";
import CategoryTags from "./CategoryTags";
import ClosetManagementTable from "./ClosetManagementTable";
import FashionManagement from "./FashionManagement";

export default function ClosetManagement() {
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
