import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const IndividualCloset = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const itemData = location?.state;

  console.log("id", id, "itemData", itemData);
  return (
    <section>
      <div className="border-b border-gray-200 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-[#6A6D57] hover:bg-[#585a48] text-white px-10 py-3 font-bold rounded-lg flex items-center space-x-2 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">Back</span>
            </button>
          </div>
        </div>
        <h1 className="text-3xl py-8 font-bold bg-gradient-to-r from-[#6A6D57] via-[#5A5D4A] to-[#4A4D3A] bg-clip-text text-transparent">
          <span className="text-[#2C2C2C]"> {itemData?.uploadedBy}</span>{" "}
          Library Management{" "}
        </h1>
      </div>
    </section>
  );
};

export default IndividualCloset;
