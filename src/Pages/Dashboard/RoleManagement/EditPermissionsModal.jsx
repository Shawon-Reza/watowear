import { X } from "lucide-react";
import { useState } from "react";

export default function EditPermissionsModal({ isOpen, onClose, roleName }) {
	if (!isOpen) return null;

	const allPermissions = [
		"Full system access",
		"User management",
		"Content moderation",
		"Analytics access",
		"System configuration",
		"Editorial content",
		"Fashion library",
		"Community moderation",
		"Report generation",
	];

	// Mock initial state based on image selections
	const [selectedPermissions, setSelectedPermissions] = useState([
		"Content moderation",
		"Analytics access",
		"Community moderation",
		"Report generation",
	]);

	const togglePermission = (perm) => {
		if (selectedPermissions.includes(perm)) {
			setSelectedPermissions(
				selectedPermissions.filter((p) => p !== perm)
			);
		} else {
			setSelectedPermissions([...selectedPermissions, perm]);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
			<div className="bg-white rounded-xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
				{/* Header */}
				<div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
					<h2 className="text-xl font-semibold text-[#222]">
						Edit Permissions:{" "}
						<span className="text-gray-600 font-normal">
							{roleName || "super admin"}
						</span>
					</h2>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 transition-colors"
					>
						<X size={24} />
					</button>
				</div>

				{/* Body */}
				<div className="p-6">
					<p className="text-gray-500 mb-6">
						Configure permissions for this role
					</p>
					<div className="space-y-4">
						{allPermissions.map((perm) => (
							<label
								key={perm}
								className="flex items-center gap-3 cursor-pointer group"
							>
								<div className="relative flex items-center">
									<input
										type="checkbox"
										className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 checked:bg-blue-500 checked:border-blue-500 transition-all"
										checked={selectedPermissions.includes(
											perm
										)}
										onChange={() => togglePermission(perm)}
									/>
									<div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-3.5 w-3.5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
								</div>
								<span className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors">
									{perm}
								</span>
							</label>
						))}
					</div>
				</div>

				{/* Footer */}
				<div className="px-6 py-4 bg-gray-50 flex items-center justify-between gap-4 border-t border-gray-100">
					{/* Design shows typical save/cancel buttons */}
					<button className="flex-1 bg-[#6A6D57] text-white py-2.5 rounded-lg font-medium hover:bg-[#5a5d4a] transition-colors shadow-sm">
						Save Changes
					</button>
					<button
						onClick={onClose}
						className="w-24 bg-gray-200 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-colors"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}
