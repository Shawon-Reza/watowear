import React, { useEffect, useState } from "react";

export default function SupportReplyModal({
	open = false,
	onClose = () => {},
	supportItem = null,
	onSend = () => {},
}) {
	const [reply, setReply] = useState("");

	useEffect(() => {
		if (open) setReply("");
	}, [open, supportItem]);

	if (!open) return null;

	function handleSend() {
		console.log("Sending reply for", supportItem?.id, { reply });
		onSend({ id: supportItem?.id, reply });
		onClose();
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div
				className="absolute inset-0 bg-black opacity-30"
				onClick={onClose}
			/>

			<div className="relative bg-white rounded-md shadow-lg w-full max-w-md p-6">
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-lg font-semibold text-black">
						Give a Reply
					</h3>
					<button onClick={onClose} className="text-gray-500">
						✕
					</button>
				</div>

				<div className="mb-3">
					<label className="block text-sm text-[#374151]">
						Subject of Issue
					</label>
					<input
						className="w-full border rounded px-3 py-2 mt-1 bg-white text-black"
						value={supportItem?.subject || ""}
						readOnly
					/>
				</div>

				<div className="mb-3">
					<label className="block text-sm text-[#374151]">
						Message
					</label>
					<textarea
						className="w-full border rounded px-3 py-2 mt-1 bg-white text-black h-20 resize-none outline-none"
						value={supportItem?.message || ""}
						readOnly
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sm text-gray-600">
						Your Reply
					</label>
					<textarea
						className="w-full border rounded px-3 py-2 mt-1 h-28 bg-white text-black"
						value={reply}
						onChange={(e) => setReply(e.target.value)}
						placeholder="Type your reply here"
					/>
				</div>

				<div className="flex justify-end">
					<button
						onClick={handleSend}
						className="bg-[#6A6D57] text-white px-4 py-2 rounded"
					>
						Send Reply
					</button>
				</div>
			</div>
		</div>
	);
}
