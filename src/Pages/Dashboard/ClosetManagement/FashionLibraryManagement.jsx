import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, Plus, Search, Upload, X, Edit3, Tags } from "lucide-react";

const FashionLibraryManagement = () => {
  const [activeTab, setActiveTab] = useState("All Items");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [items, setItems] = useState(
    Array(20)
      .fill(null)
      .map((_, index) => ({
        id: index + 1,
        name: "T-Shirt",
        category: "Casual",
        image:
          "https://shop.studioinnate.com/wp-content/uploads/2024/08/oversized-tshirt-cover.png",
      }))
  );

  const onSubmit = (data) => {
    console.log(data);
    if (showModal === "add") {
      const newItem = {
        id: items.length + 1,
        name: data.name,
        category: data.category,
        image: data.image[0]
          ? URL.createObjectURL(data.image[0])
          : items[0].image,
      };
      setItems([...items, newItem]);
    } else if (showModal === "edit" && editItem) {
      setItems(
        items.map((item) =>
          item.id === editItem.id
            ? {
                ...item,
                name: data.name,
                category: data.category,
                image: data.image[0]
                  ? URL.createObjectURL(data.image[0])
                  : item.image,
              }
            : item
        )
      );
    }
    setShowModal(null);
    reset();
  };

  const handleEdit = (item, itemId) => {
    console.log(itemId, item);
    setEditItem(item);
    setShowModal("edit");
    reset({
      name: item.name,
      category: item.category,
    });
  };

  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen">
      <div className="border-b border-gray-200 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="bg-[#6A6D57] hover:bg-[#585a48] text-white px-10 py-3 font-bold rounded-lg flex items-center space-x-2 transition-colors">
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">Back</span>
            </button>
          </div>
        </div>
        <h1 className="text-3xl py-8 font-bold bg-gradient-to-r from-[#6A6D57] via-[#5A5D4A] to-[#4A4D3A] bg-clip-text text-transparent">
          Fashion Library Management
        </h1>
      </div>

      <div className="py-4 flex items-center justify-between">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px] pl-12 pr-4 py-4 bg-white/60 border border-[#6A6D57]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/50 focus:border-[#6A6D57]/50 transition-all duration-300 text-[#6A6D57] placeholder-[#6A6D57]/50"
          />
        </div>
        <button
          onClick={() => {
            setShowModal("add");
            reset();
          }}
          className="bg-[#6A6D57] hover:bg-[#585a48] text-white px-4 py-3 font-bold rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={16} />
          <span>Add New Item</span>
        </button>
      </div>

      <div className="pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {items
            .filter(
              (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item) => (
              <div
                key={item.id}
                className="relative bg-white shadow drop-shadow-lg rounded-[20px] overflow-hidden"
              >
                {/* X Button */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-red-100 hover:bg-red-400 shadow hover:text-white"
                >
                  <X size={16} className="text-gray-500" />
                </button>

                <figure className="aspect-square bg-white">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-contain w-full h-full"
                  />
                </figure>
                <div className="card-body p-4 dark:bg-[#FDFFF4]">
                  <div className="flex text-xl font-extrabold items-center justify-between text-[#4A4A4A]">
                    {item.name}
                    <div className="badge font-semibold badge-lg text-xs px-2 bg-[#F3F4F6] hover:bg-gray-200 rounded-full p-1 border-none text-[#374151]">
                      <Tags size={14} className="text-[#6B7280]" />
                      {item.category}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    This is a sample product description.
                  </p>
                  <div className="card-actions justify-between mt-2">
                    <button
                      onClick={() => handleEdit(item, item?.id)}
                      className="rounded-[6px] w-full px-10 py-2 text-white bg-[#6A6D57] hover:bg-[#585a48]"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-[700px] mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {showModal === "add" ? "Add New Item" : "Edit Item"}
              </h2>
              <div className="flex items-center space-x-2">
                <Edit3 size={16} className="text-gray-400" />
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

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Name
                </label>
                <input
                  {...register("name", { required: "Item name is required" })}
                  placeholder="T-shirt"
                  className={`w-full px-3 py-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
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
                      required: "Category is required",
                    })}
                    placeholder="Casual"
                    className={`flex-1 px-3 py-2 border ${
                      errors.category ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  />
                  <select
                    {...register("tag")}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Top">Top</option>
                    <option value="Bottom">Bottom</option>
                    <option value="Dress">Dress</option>
                    <option value="Outerwear">Outerwear</option>
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
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop files here, or click to browse
                  </p>
                  <p className="text-xs text-gray-500">Supports: JPG, PNG</p>
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
                    document.getElementById("image-upload").click()
                  }
                  className="w-full mt-3 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <Upload size={16} />
                  <span>Upload Image</span>
                </button>
              </div>

              <div className="px-6 py-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  {showModal === "add" ? "Add" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FashionLibraryManagement;
