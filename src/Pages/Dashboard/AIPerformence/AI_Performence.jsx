import { BrainCircuit, CircleCheckBig, Clock4 } from "lucide-react";
import { useState } from "react";
import { TfiStatsUp } from "react-icons/tfi";
import RecentOutfitSuggestion from "./RecentOutfitSuggestion";

const AI_Performence = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(
    "A modern high-fashion editorial photoshoot featuring a model standing in an urban city street at dusk. The outfit combines contemporary streetwear with luxury couture elements: an oversized tailored blazer layered over a sleek silk slip dress, paired with chunky statement boots. Accessories include bold geometric earrings, a structured leather handbag, and futuristic sunglasses. The mood is confident, chic, and cosmopolitan, with soft neon reflections from city lights adding a cinematic glow. The overall style should feel sophisticated yet edgy, balancing elegance with street-style attitude."
  );

  const [draft, setDraft] = useState(text);

  const handleEdit = () => {
    setDraft(text);
    setIsEditing(true);
  };

  const handleSave = () => {
    setText(draft);
    setIsEditing(false);
  };
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">AI Performance</h2>
        <p className="text-gray-500">
          Monitor AI outfit suggestions and performance metrics
        </p>
      </div>

      {/* cards */}
      <div className="grid grid-cols-4 gap-20 ">
        {/* Suggestions Accuracy */}
        <div className="p-5 rounded-2xl border-l-8 border-l-[#6A6D57] bg-white shadow drop-shadow-lg">
          <h3 className="text-[#6B7280]">Suggestions Accuracy</h3>
          <div className="text-black flex items-center justify-between py-4">
            <h1 className="font-extrabold text-3xl">92.7%</h1>
            <BrainCircuit size={32} className="text-[#6366F1]" />
          </div>
          <p className="text-[#6B7280]">
            <span className="text-green-500">+2.3%</span> vs last month
          </p>
        </div>

        {/* User Acceptance Rate */}
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

        {/* Avg Response Time */}
        <div className="p-5 border-l-8 border-l-[#6A6D57] rounded-2xl bg-white shadow drop-shadow-lg">
          <h3 className="text-[#6B7280]">Avg. Response Time</h3>
          <div className="text-black flex items-center justify-between py-4">
            <h1 className="font-extrabold text-3xl">1.2s</h1>
            <Clock4 size={32} className="text-[#3B82F6]" />
          </div>
        </div>

        {/* Total Suggestions */}
        <div className="p-5 border-l-8 border-l-[#6A6D57] rounded-2xl bg-white shadow drop-shadow-lg">
          <h3 className="text-[#6B7280]">Total Suggestions</h3>
          <div className="text-black flex items-center justify-between py-4">
            <h1 className="font-extrabold text-3xl">145,872</h1>
            <TfiStatsUp size={32} className="text-[#A855F7]" />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Prompt Modify</h1>

        <div className="space-y-6">
          <div className="bg-white p-10 shadow drop-shadow-md rounded-[12px]">
            {isEditing ? (
              <textarea
                className="w-full p-3 dark:bg-white border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]"
                rows={6}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
            ) : (
              <h1 className="text-[#747474]">{text}</h1>
            )}
          </div>

          <div className="w-full flex items-center gap-6 rounded-[12px]">
            {!isEditing ? (
              <button
                className="border border-[#6A6D57] w-full py-3 rounded-[6px] hover:bg-gray-100 text-lg text-[#2C2C2C] font-extrabold"
                onClick={handleEdit}
              >
                Edit
              </button>
            ) : (
              <button
                className="border border-red-500 w-full py-3 rounded-[6px] bg-red-100 hover:bg-red-200 text-lg font-extrabold text-red-700"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            )}

            <button
              className="border w-full py-3 rounded-[6px] bg-[#6A6D57] hover:bg-[#585a48] text-lg font-extrabold text-white"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div>
        <RecentOutfitSuggestion />
      </div>
    </div>
  );
};

export default AI_Performence;
