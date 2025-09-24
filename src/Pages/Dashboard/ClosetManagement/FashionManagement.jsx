import { Tags } from "lucide-react";
import { Link } from "react-router-dom";

const FashionManagement = () => {
  const items = [
    {
      id: 1,
      name: "T-Shirt",
      category: "Casual",
      image:
        "https://poshgarments.com/wp-content/uploads/2021/09/Mens-Shirt-MWS0001.jpg",
    },
    {
      id: 2,
      name: "T-Shirt",
      category: "Casual",
      image:
        "https://www.grog.eu/wp-content/uploads/2020/09/square-round-neck-white-black-grog-classic-logo-tshirt-EPT-03.png",
    },
    {
      id: 3,
      name: "T-Shirt",
      category: "Casual",
      image:
        "https://shop.adarbepari.com/wp-content/uploads/2023/11/coral-sea-shell-printed-cuban-collar-shirt.jpg",
    },
    {
      id: 4,
      name: "T-Shirt",
      category: "Casual",
      image:
        "https://img.drz.lazcdn.com/static/bd/p/1febf15fb4e4a3f102317d764198cf5c.jpg_720x720q80.jpg",
    },
  ];

  return (
    <div className=" ">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8 ">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow drop-shadow-lg rounded-[20px] overflow-hidden"
            >
              <figure className="aspect-square bg-white">
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="object-contain w-full h-full"
                />
              </figure>

              <div className="card-body p-4 dark:bg-[#FDFFF4]">
                <div className="flex text-xl font-extrabold items-center justify-between text-[#4A4A4A]">
                  {item?.name}
                  <div className="badge font-semibold badge-lg text-xs px-2 bg-[#F3F4F6] hover:bg-gray-200 rounded-full p-1 border-none text-[#374151]">
                    <Tags size={14} className="text-[#6B7280]" />
                    {item.category}
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  This is a sample product description.
                </p>

                <div className="card-actions justify-between mt-2">
                  <button className="rounded-[6px] px-10 py-2 text-white bg-[#6A6D57]  hover:bg-[#585a48]">
                    Edit
                  </button>
                  <button className="rounded-[6px] px-10 py-2 text-white bg-red-500  hover:bg-red-600">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link
          to="/admin/fashion_management"
          className="text-right flex items-center justify-end"
        >
          <button className="bg-white hover:bg-gray-50 shadow drop-shadow-lg shadow-gray-200 text-[#6A6D57]  px-8 py-2 rounded-[12px] hover:cursor-pointer font-extrabold">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FashionManagement;
