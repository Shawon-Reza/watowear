import { useState, useRef, useEffect } from "react";
import { Trash2, MoreVertical, Search } from "lucide-react";
import CategoryTags from "./CategoryTags";
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

  // Reset page when filters change
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

        {/* Main Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-[#6A6D57]/10  shadow-md overflow-hidden">
          {/* Search Header */}
          <div className="p-8 bg-gradient-to-r from-white/40 to-[#6A6D57]/5 border-b border-[#6A6D57]/10">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6A6D57]/60"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search items or uploaded by..."
                  className="w-full pl-12 pr-4 py-4 bg-white/60 border border-[#6A6D57]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/50 focus:border-[#6A6D57]/50 transition-all duration-300 text-[#6A6D57] placeholder-[#6A6D57]/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <select
                  className="px-4 py-3 bg-white/60 border border-[#6A6D57]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/50 text-[#6A6D57]"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option>All Status</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Enhanced Table */}
          <div
            className="overflow-x-auto cursor-pointer"
            style={{ maxHeight: "600px", overflowY: "auto" }}
          >
            <table className="w-full">
              <thead className="bg-gradient-to-r from-[#F4F1EB] to-white">
                <tr className="border-b border-[#6A6D57]/10">
                  <th className="px-8 py-6 text-left font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-8 py-6 text-left font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-8 py-6 text-left font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
                    Tags
                  </th>
                  <th className="px-8 py-6 text-left font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
                    Uploaded By
                  </th>
                  <th className="px-8 py-6 text-left font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-8 py-6 text-left font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
                    Date Added
                  </th>
                  <th className="px-8 py-6 text-center font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#6A6D57]/10">
                {visibleItems.map((item) => (
                  <tr
                    key={item.id}
                    className="group hover:bg-gradient-to-r hover:from-[#6A6D57]/5 hover:to-[#6A6D57]/10 transition-all duration-300 hover:shadow-md"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-[50px] h-[50px] bg-gray-200 rounded flex items-center justify-center">
                          ID #{item.id}
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-[#6A6D57] text-start text-base group-hover:text-[#5A5D4A] transition-colors">
                            {item.item}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-[#6A6D57] text-base font-semibold">
                      {item.category}
                    </td>
                    <td className="px-8 py-6 text-gray-900">{item.tags}</td>
                    <td className="px-8 py-6 text-gray-900">
                      {item.uploadedBy}
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold shadow-sm ${
                          item.status === "Approved"
                            ? "bg-gradient-to-r from-green-100 to-emerald-200 text-green-700"
                            : "bg-gradient-to-r from-red-100 to-red-200 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-gray-900">
                      {item.dateAdded}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="group/btn p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                          title="Delete Item"
                        >
                          <Trash2
                            size={18}
                            className="group-hover/btn:scale-110 transition-transform"
                          />
                        </button>
                        <button
                          className="group/btn p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                          title="More Actions"
                        >
                          <MoreVertical
                            size={18}
                            className="group-hover/btn:scale-110 transition-transform"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {hasMore && (
              <div ref={loaderRef} className="py-4 text-center">
                Loading more...
              </div>
            )}
          </div>
        </div>

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
