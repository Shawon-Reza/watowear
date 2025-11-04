import { useState } from "react";
import { Plus, Shirt, Tag, Tags } from "lucide-react";
import { useForm } from "react-hook-form";

const CategoryTags = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Tops", amount: 245 },
    { id: 2, name: "Bottoms", amount: 1875 },
    { id: 3, name: "Dresses", amount: 245 },
    { id: 4, name: "Outerwear", amount: 987 },
    { id: 5, name: "Footwear", amount: 978 },
    { id: 6, name: "Knitwear", amount: 2132 },
  ]);
  const [tags, setTags] = useState([
    { id: 1, name: "Summer" },
    { id: 2, name: "Winter" },
    { id: 3, name: "Casual" },
  ]);

  // ✅ React Hook Form for categories
  const {
    register: registerCategory,
    handleSubmit: handleCategorySubmit,
    reset: resetCategory,
    formState: { errors: categoryErrors },
  } = useForm();

  const addCategory = (category) => {
    setCategories([
      ...categories,
      { id: categories.length + 1, name: category.category_name, amount: 0 },
    ]);
    resetCategory();
    document.getElementById("category_add").close();
  };

  // ✅ React Hook Form for tags
  const {
    register: registerTag,
    handleSubmit: handleTagSubmit,
    reset: resetTag,
    formState: { errors: tagErrors },
  } = useForm();

  const addTag = (data) => {
    setTags([...tags, { id: tags.length + 1, name: data.tag_name }]);
    resetTag();
    document.getElementById("tag_add").close();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-stretch justify-between gap-6">
        {/* Categories card */}
        <div className="bg-white basis-full md:basis-6/12 rounded-xl border border-[#6A6D57]/10 shadow-sm overflow-hidden flex flex-col">
          <h1 className="text-[#303030] font-semibold text-lg border-b p-4">
            Categories
          </h1>
          <div className="border-b">
            {categories?.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between px-4 py-3">
                <div className="text-base font-semibold flex items-center gap-2 text-[#374151]">
                  <Shirt size={18} className="text-[#6A6D57]" />
                  {cat.name}
                </div>
                <div className="text-sm font-semibold text-[#374151]">{cat.amount}</div>
              </div>
            ))}
          </div>

          <button
            className="flex items-center gap-2 py-2 text-sm text-[#374151] font-semibold mx-auto"
            onClick={() => document.getElementById("category_add").showModal()}
          >
            <Plus size={16} />
            Add Category
          </button>
        </div>

        {/* Tags card */}
        <div className="bg-white basis-full md:basis-6/12 rounded-xl border border-[#6A6D57]/10 shadow-sm overflow-hidden flex flex-col">
          <h1 className="text-[#303030] font-semibold text-lg border-b p-4">
            Tags
          </h1>
          <div className="border-b p-4 flex flex-wrap gap-2">
            {tags?.map((tag) => (
              <div key={tag.id} className="hover:cursor-pointer">
                <div className="text-sm font-semibold flex items-center gap-2 text-[#374151]">
                  <div className="inline-flex items-center bg-[#F3F4F6] hover:bg-gray-200 rounded-full px-3 py-1 text-sm text-[#374151]">
                    <Tags size={14} className="text-[#6B7280] mr-2" />
                    {tag.name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="flex items-center gap-2 py-2 text-sm text-[#374151] font-semibold mx-auto"
            onClick={() => document.getElementById("tag_add").showModal()}
          >
            <Plus size={16} />
            Add Tag
          </button>
        </div>
      </div>

      {/* Category Modal */}
      <dialog id="category_add" className="modal">
        <div className="modal-box bg-white text-[#374151] relative p-4">
          <button
            className="absolute right-2 top-2 text-gray-600 hover:bg-gray-100 rounded-full p-1"
            onClick={() => document.getElementById("category_add").close()}
          >
            ✕
          </button>
          <h3 className="font-semibold text-lg mb-3">Add Category</h3>

          <form onSubmit={handleCategorySubmit(addCategory)}>
            <fieldset className="mb-3">
              <legend className="text-sm text-[#374151] mb-1">Category name</legend>
              <input
                type="text"
                {...registerCategory("category_name", {
                  required: "Category name is required",
                })}
                className="w-full border text-sm border-gray-300 rounded-md px-2 py-2 focus:outline-none"
                placeholder="Type category"
              />
              {categoryErrors.category_name && (
                <p className="text-red-500 text-sm mt-1">{categoryErrors.category_name.message}</p>
              )}
            </fieldset>
            <button type="submit" className="font-semibold text-sm bg-[#6A6D57] w-full py-2 rounded text-white">Add Category</button>
          </form>
        </div>
      </dialog>

      {/* Tag Modal */}
      <dialog id="tag_add" className="modal">
        <div className="modal-box bg-white text-[#374151] relative p-4">
          <button
            className="absolute right-2 top-2 text-gray-600 hover:bg-gray-100 rounded-full p-1"
            onClick={() => document.getElementById("tag_add").close()}
          >
            ✕
          </button>
          <h3 className="font-semibold text-lg mb-3">Add Tag</h3>

          <form onSubmit={handleTagSubmit(addTag)}>
            <fieldset className="mb-3">
              <legend className="text-sm text-[#374151] mb-1">Tag name</legend>
              <input
                type="text"
                {...registerTag("tag_name", {
                  required: "Tag name is required",
                })}
                className="w-full border text-sm border-gray-300 rounded-md px-2 py-2 focus:outline-none"
                placeholder="Type tag"
              />
              {tagErrors.tag_name && (
                <p className="text-red-500 text-sm mt-1">{tagErrors.tag_name.message}</p>
              )}
            </fieldset>
            <button type="submit" className="font-semibold text-sm bg-[#6A6D57] w-full py-2 rounded text-white">Add Tag</button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default CategoryTags;
