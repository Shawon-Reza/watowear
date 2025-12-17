import { CheckCircle, Clock, FileText } from "lucide-react";

const SAMPLE_ACTIVITIES = [
	{
		id: 1,
		title: "Added New Items",
		subtitle: "Items Name :",
		time: "2 days ago",
		status: "Success",
	},
	{
		id: 2,
		title: "Generated Outfit",
		subtitle: "Outfit Name :",
		time: "6 days ago",
		status: "Success",
	},
];

export default function UserProfileRecentActivity() {
	return (
		<div className="bg-white rounded-xl border border-[#e8e8e8] shadow-sm p-6">
			<div className="flex items-center gap-3 mb-6">
				<FileText size={20} className="text-[#6A6D57]" />
				<h3 className="text-xl font-bold text-[#333]">
					Recent Activities
				</h3>
			</div>

			<div className="space-y-4">
				{SAMPLE_ACTIVITIES.map((act) => (
					<div
						key={act.id}
						className="group flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all"
					>
						<div className="mb-2 md:mb-0">
							<div className="text-base font-semibold text-gray-900">
								{act.title}
							</div>
							<div className="text-sm text-gray-500 mt-1">
								{act.subtitle}
							</div>
						</div>

						<div className="flex items-center gap-4">
							<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-100">
								<CheckCircle size={14} />
								{act.status}
							</span>
							<div className="text-xs text-gray-400 flex items-center gap-1">
								<Clock size={14} />
								{act.time}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
