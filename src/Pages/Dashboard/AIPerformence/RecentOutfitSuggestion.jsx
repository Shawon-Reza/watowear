import React, { useState, useEffect, useRef } from "react";

const RecentOutfitSuggestion = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const initialItems = [
    {
      id: 1,
      user: "Emma Johnson",
      category: "Casual Summer Look",
      feedback: "Accepted",
    },
    {
      id: 2,
      user: "Michael Chen",
      category: "Business Meeting",
      feedback: "Accepted",
    },
    {
      id: 3,
      user: "Sophia Rodriguez",
      category: "Evening Dinner",
      feedback: "Rejected",
    },
    {
      id: 4,
      user: "James Wilson",
      category: "Workout Session",
      feedback: "Accepted",
    },
    {
      id: 5,
      user: "Olivia Martinez",
      category: "Beach Day",
      feedback: "Rejected",
    },
  ];

  useEffect(() => {
    setVisibleItems(initialItems.slice(0, 3));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          const nextItems = initialItems.slice(
            visibleItems.length,
            visibleItems.length + 2
          );
          if (nextItems.length > 0) {
            setVisibleItems((prev) => [...prev, ...nextItems]);
          } else {
            setHasMore(false);
          }
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [visibleItems, hasMore]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-[#6A6D57] mb-6">
        Recent Outfit Suggestions
      </h2>
      <div
        className="overflow-x-auto cursor-pointer"
        style={{ maxHeight: "600px", overflowY: "auto" }}
      >
        <table className="w-full">
          <thead className="bg-gradient-to-r from-[#F4F1EB] to-white">
            <tr className="border-b border-[#6A6D57]/10">
              <th className="px-8 py-6 text-left font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
                User
              </th>
              <th className="px-8 py-6 text-left font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
                Category
              </th>
              <th className="px-8 py-6 text-left font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
                Feedback
              </th>
              <th className="px-8 py-6 text-left font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
                Message Request
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#6A6D57]/10">
            {visibleItems.map((itemData) => (
              <tr
                key={itemData.id}
                className="group hover:bg-gradient-to-r hover:from-[#6A6D57]/5 hover:to-[#6A6D57]/10 transition-all duration-300 hover:shadow-md"
              >
                <td className="px-8 py-6 text-[#6A6D57] text-base font-semibold">
                  {itemData.user}
                </td>
                <td className="px-8 py-6 text-[#6A6D57] text-base font-semibold">
                  {itemData.category}
                </td>
                <td className="px-8 py-6">
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
                      itemData.feedback === "Accepted"
                        ? "bg-gradient-to-r from-green-100 to-emerald-200 text-green-700"
                        : "bg-gradient-to-r from-red-100 to-red-200 text-red-700"
                    }`}
                  >
                    {itemData.feedback}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <button
                    className="text-gray-500 text-sm font-bold hover:text-gray-700 bg-[#F6F4EE] rounded-full px-4 py-2 transition-colors"
                    onClick={() =>
                      console.log(`View message for ${itemData.user}`)
                    }
                  >
                    View Message
                  </button>
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
      <div className="mt-4 text-center">
        <button className="text-gray-500 hover:text-gray-700 transition-colors">
          View All Suggestions
        </button>
      </div>
    </div>
  );
};

export default RecentOutfitSuggestion;
