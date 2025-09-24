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
    <div className="space-y-6">
      <div className="flex items-stretch justify-between gap-20">
        {/* Categories card */}
        <div className="dark:bg-white basis-6/12 h-full backdrop-blur-sm rounded-3xl border border-[#6A6D57]/10 shadow-md overflow-hidden flex flex-col">
          <h1 className="text-[#303030] font-bold text-xl border-b-2 p-6">
            Categories
          </h1>
          <div className="border-b flex-grow">
            {categories?.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between p-5"
              >
                <div className="text-lg font-extrabold flex items-center gap-2 text-[#374151]">
                  <Shirt size={22} className="text-[#6A6D57]" />
                  {cat.name}
                </div>
                <div className="text-lg font-extrabold text-[#374151]">
                  {cat.amount}
                </div>
              </div>
            ))}
          </div>

          <button
            className="flex items-center gap-2 py-5 text-lg text-[#374151] font-extrabold mx-auto"
            onClick={() => document.getElementById("category_add").showModal()}
          >
            <Plus size={20} />
            Add Category
          </button>
        </div>

        {/* Tags card */}
        <div className="dark:bg-white basis-6/12 h-full backdrop-blur-sm rounded-3xl border border-[#6A6D57]/10 shadow-md overflow-hidden flex flex-col">
          <h1 className="text-[#303030] font-bold text-xl border-b-2 p-6">
            Tags
          </h1>
          <div className="border-b p-5 flex gap-2">
            {tags?.map((tag) => (
              <div key={tag.id} className="hover:cursor-pointer ">
                <div className="text-lg font-extrabold flex items-center gap-2 text-[#374151]">
                  <div className="badge badge-lg bg-[#F3F4F6] hover:bg-gray-200 rounded-full p-5 border-none text-[#374151]">
                    <Tags size={18} className="text-[#6B7280]" />
                    {tag.name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="flex items-center gap-2 py-5 text-lg text-[#374151] font-extrabold mx-auto"
            onClick={() => document.getElementById("tag_add").showModal()}
          >
            <Plus size={20} />
            Add Tag
          </button>
        </div>
      </div>

      {/* Category Modal */}
      <dialog id="category_add" className="modal">
        <div className="modal-box bg-white text-[#374151] relative">
          <button
            className="btn btn-sm btn-circle btn-ghost hover:bg-gray-200 absolute right-2 top-2"
            onClick={() => document.getElementById("category_add").close()}
          >
            ✕
          </button>
          <h3 className="font-extrabold text-2xl mb-4">Add Category</h3>

          <form onSubmit={handleCategorySubmit(addCategory)}>
            <fieldset className="fieldset mb-4">
              <legend className="fieldset-legend text-base text-[#374151]">
                Category name
              </legend>
              <input
                type="text"
                {...registerCategory("category_name", {
                  required: "Category name is required",
                })}
                className="w-full border text-sm border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-0 dark:bg-white"
                placeholder="Type category"
              />
              {categoryErrors.category_name && (
                <p className="text-red-500 text-sm mt-1">
                  {categoryErrors.category_name.message}
                </p>
              )}
            </fieldset>
            <button
              type="submit"
              className="font-extrabold text-base bg-[#6A6D57] w-full p-2 rounded-[6px] text-white"
            >
              Add Category
            </button>
          </form>
        </div>
      </dialog>

      {/* Tag Modal */}
      <dialog id="tag_add" className="modal">
        <div className="modal-box bg-white text-[#374151] relative">
          <button
            className="btn btn-sm btn-circle btn-ghost hover:bg-gray-200 absolute right-2 top-2"
            onClick={() => document.getElementById("tag_add").close()}
          >
            ✕
          </button>
          <h3 className="font-extrabold text-2xl mb-4">Add Tag</h3>

          <form onSubmit={handleTagSubmit(addTag)}>
            <fieldset className="fieldset mb-4">
              <legend className="fieldset-legend text-base text-[#374151]">
                Tag name
              </legend>
              <input
                type="text"
                {...registerTag("tag_name", {
                  required: "Tag name is required",
                })}
                className="w-full border text-sm border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-0 dark:bg-white"
                placeholder="Type tag"
              />
              {tagErrors.tag_name && (
                <p className="text-red-500 text-sm mt-1">
                  {tagErrors.tag_name.message}
                </p>
              )}
            </fieldset>
            <button
              type="submit"
              className="font-extrabold text-base bg-[#6A6D57] w-full p-2 rounded-[6px] text-white"
            >
              Add Tag
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default CategoryTags;
