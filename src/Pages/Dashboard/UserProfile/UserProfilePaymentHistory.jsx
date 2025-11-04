import React, { useMemo, useState, useRef, useEffect } from "react";
import { FileText, Download, Eye, MoreVertical } from "lucide-react";

const SAMPLE_PAYMENTS = [
  { id: 1, date: "2025-10-01", plan: "Plus Plan", amount: 24.99, method: "Card • **** 4242", status: "Paid", tx: "TXN-1001" },
  { id: 2, date: "2025-09-01", plan: "Plus Plan", amount: 24.99, method: "Card • **** 4242", status: "Paid", tx: "TXN-0956" },
  { id: 3, date: "2025-08-01", plan: "Plus Plan", amount: 24.99, method: "Card • **** 4242", status: "Failed", tx: "TXN-0892" },
  { id: 4, date: "2025-07-01", plan: "Plus Plan", amount: 24.99, method: "Card • **** 4242", status: "Paid", tx: "TXN-0744" },
  { id: 5, date: "2025-06-01", plan: "Basic", amount: 0.0, method: "N/A", status: "Free", tx: "TXN-0610" },
];

export default function UserProfilePaymentHistory() {
  const [payments] = useState(SAMPLE_PAYMENTS);
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return payments;
    return payments.filter(
      (p) =>
        p.plan.toLowerCase().includes(q) ||
        String(p.tx).toLowerCase().includes(q) ||
        p.method.toLowerCase().includes(q)
    );
  }, [payments, search]);

  const statusClass = (s) => {
    if (s === "Paid") return "bg-green-100 text-green-700";
    if (s === "Failed") return "bg-red-100 text-red-700";
    if (s === "Pending") return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Payment History</h2>
        <div className="relative w-64">
          <input
            placeholder="Search by plan, tx id or method..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-3 py-2 border rounded-xl bg-white/60 text-sm text-[#6A6D57]"
          />
        </div>
      </div>

      <div className="bg-white/70 rounded-2xl border border-[#6A6D57]/10 p-4">
        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {filtered.map((p) => (
            <div key={p.id} className="p-3 bg-white rounded-lg border border-[#eee] shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{p.plan}</div>
                  <div className="text-xs text-[#6A6D57]/80">{new Date(p.date).toLocaleDateString()}</div>
                  <div className="mt-2 text-sm">{p.method}</div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold">${p.amount.toFixed(2)}</div>
                  <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm ${statusClass(p.status)}`}>{p.status}</div>
                </div>
              </div>

                <div className="mt-3 flex items-center justify-between relative" ref={containerRef}>
                  <div className="text-xs text-[#6A6D57]/70">{p.tx}</div>
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === p.id ? null : p.id);
                      }}
                      className="p-2 rounded-md hover:bg-gray-100"
                      aria-haspopup="true"
                      aria-expanded={openMenuId === p.id}
                    >
                      <MoreVertical size={16} />
                    </button>

                    {openMenuId === p.id && (
                      <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg border z-50">
                        <button onClick={() => { console.log('Refund', p.tx); setOpenMenuId(null); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"> <Download size={14} className="inline mr-2"/> Refund</button>
                        <button onClick={() => { console.log('Details', p.tx); setOpenMenuId(null); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"> <FileText size={14} className="inline mr-2"/> Details</button>
                      </div>
                    )}
                  </div>
                </div>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#F4F1EB] to-white">
              <tr className="border-b border-[#6A6D57]/10">
                <th className="px-6 py-4 text-left text-sm font-bold text-[#6A6D57]">Date</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#6A6D57]">Plan</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#6A6D57]">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#6A6D57]">Method</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#6A6D57]">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#6A6D57]">Transaction</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-[#6A6D57]">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#6A6D57]/10">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-[#f8fbf8] transition-all">
                  <td className="px-6 py-4 text-gray-900">{new Date(p.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-[#6A6D57] font-medium">{p.plan}</td>
                  <td className="px-6 py-4 font-bold">${p.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-700">{p.method}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${statusClass(p.status)}`}>{p.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#6A6D57]/80">{p.tx}</td>
                  <td className="px-6 py-4 text-center" ref={containerRef}>
                    <div className="flex items-center justify-center gap-2 relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === p.id ? null : p.id);
                        }}
                        className="p-2 rounded-md hover:bg-gray-100"
                        aria-haspopup="true"
                        aria-expanded={openMenuId === p.id}
                      >
                        <MoreVertical size={16} />
                      </button>

                      {openMenuId === p.id && (
                        <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-md shadow-lg border z-50">
                          <button onClick={() => { console.log('Refund', p.tx); setOpenMenuId(null); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"> <Download size={14} className="inline mr-2"/> Refund</button>
                          <button onClick={() => { console.log('Details', p.tx); setOpenMenuId(null); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"> <FileText size={14} className="inline mr-2"/> Details</button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}