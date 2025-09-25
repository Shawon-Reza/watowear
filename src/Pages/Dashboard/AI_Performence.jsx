import { BrainCircuit, CircleCheckBig, Clock4 } from "lucide-react";
import { TfiStatsUp } from "react-icons/tfi";

const AI_Performence = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">AI Performance</h2>
        <p className="text-gray-500">
          Monitor AI outfit suggestions and performance metrics
        </p>
      </div>

      {/* cards */}

      <div className="grid grid-cols-4 gap-20">
        <div className="p-5 rounded-2xl border-l-8 border-l-[#6A6D57] bg-white shadow drop-shadow-lg">
          <h3 className="text-[#6B7280]">Suggestions Accuracy</h3>
          <div className="text-black flex items-center justify-between py-4">
            <h1 className="font-extrabold text-3xl">92.7 %</h1>
            <BrainCircuit size={32} className="text-[#6366F1]" />
          </div>
          <p className="text-[#6B7280]">
            <span className="text-green-500">+2.3%</span> vs last month
          </p>
          <progress
            className="w-full bg-[#6366F1] "
            value="92.7"
            max="100"
          ></progress>
        </div>

        <div className="p-5 border-l-8 border-l-[#6A6D57]  rounded-2xl bg-white shadow drop-shadow-lg">
          <h3 className="text-[#6B7280]">User Acceptance Rate</h3>
          <div className="text-black flex items-center justify-between py-4">
            <h1 className="font-extrabold text-3xl">78.4%</h1>
            <CircleCheckBig size={32} className="text-[#22C55E]" />
          </div>
          <p className="text-[#6B7280]">
            <span className="text-green-500">+4.1%</span> vs last month
          </p>
        </div>

        <div className="p-5 border-l-8 border-l-[#6A6D57] rounded-2xl bg-white shadow drop-shadow-lg">
          <h3 className="text-[#6B7280]">Avg. Response Time</h3>
          <div className="text-black flex items-center justify-between py-4">
            <h1 className="font-extrabold text-3xl">1.2s</h1>
            <Clock4 size={32} className="text-[#3B82F6]" />
          </div>
        </div>

        <div className="p-5 border-l-8 border-l-[#6A6D57] rounded-2xl bg-white shadow drop-shadow-lg">
          <h3 className="text-[#6B7280]">Suggestions Accuracy</h3>
          <div className="text-black flex items-center justify-between py-4">
            <h1 className="font-extrabold text-3xl">145,872</h1>
            <TfiStatsUp size={32} className="text-[#A855F7]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI_Performence;
