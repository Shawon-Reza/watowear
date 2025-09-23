import { Plus, Shirt } from "lucide-react";

const CategoryTags = () => {
  const cloths = [
    { id: 1, name: "Tops", amount: 245 },
    { id: 2, name: "Bottoms", amount: 1875 },
    { id: 3, name: "Dresses", amount: 245 },
    { id: 4, name: "Outerwear", amount: 987 },
    { id: 5, name: "Footwear", amount: 978 },
    { id: 6, name: "Knitwear", amount: 2132 },
  ];

  return (
    <div className="">
      <div className="flex items-center justify-between gap-20">
        {/* Left card */}
        <div className="dark:bg-white basis-6/12 backdrop-blur-sm rounded-3xl border border-[#6A6D57]/10 shadow-md overflow-hidden ">
          <h1 className="text-[#303030] font-bold text-xl border-b-2 p-6">
            Categories
          </h1>
          <div className="border-b">
            {cloths?.map((cloth) => (
              <div
                key={cloth?.id}
                className="flex items-center justify-between p-5 "
              >
                <div className="text-lg font-extrabold flex items-center gap-2 text-[#374151]">
                  <Shirt size={24} className="text-[#6A6D57]" />
                  {cloth?.name}
                </div>
                <div className="text-lg font-extrabold flex items-center gap-2 text-[#374151]">
                  {cloth?.amount}
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

        {/* Right card */}
        <div className="dark:bg-white basis-6/12 backdrop-blur-sm rounded-3xl border border-[#6A6D57]/10 shadow-md overflow-hidden ">
          <h1 className="text-[#303030] font-bold text-xl border-b-2 p-6">
            Categories
          </h1>
          <div>
            {cloths?.map((cloth) => (
              <div
                key={cloth?.id}
                className="flex items-center justify-between p-5 "
              >
                <div className="text-lg font-extrabold flex items-center gap-2 text-[#374151]">
                  <Shirt size={24} className="text-[#6A6D57]" />
                  {cloth?.name}
                </div>
                <div className="text-lg font-extrabold flex items-center gap-2 text-[#374151]">
                  {cloth?.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal OUTSIDE of cards */}
      <dialog id="category_add" className="modal">
        <div className="modal-box bg-white text-[#374151]">
          <button
            className="btn btn-sm btn-circle btn-ghost hover:bg-gray-200 border-none hover:text-black absolute right-2 top-2"
            onClick={() => document.getElementById("category_add").close()}
          >
            ✕
          </button>

          <h3 className="font-extrabold text-2xl">Add New Category</h3>

          <fieldset className="fieldset mt-8">
            <legend className="fieldset-legend text-base text-[#374151]">
              Category name
            </legend>
            <input
              type="text"
              className="w-full border text-sm border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-0 dark:bg-white"
              placeholder="Type here"
            />
          </fieldset>
        </div>
      </dialog>
    </div>
  );
};

export default CategoryTags;
