import { Calendar, MoreHorizontal } from "lucide-react";
import useUserStore from "../../../store/useUserStore";

const DEFAULT_USER = {
	name: "Olivia Martinez",
	email: "olivia.martinez@example.com",
	joined: "Apr 17, 2022",
	plan: "Plus Plan",
	avatar: "https://i.pravatar.cc/96?img=47",
};

export default function UserProfileHeader() {
	const { currentUser } = useUserStore();

	const name = currentUser
		? `${currentUser.name} ${currentUser.surname}`
		: DEFAULT_USER.name;
	const email = currentUser?.email || DEFAULT_USER.email;
	const joined = currentUser?.date_joined
		? new Date(currentUser.date_joined).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
		  })
		: DEFAULT_USER.joined;
	const avatar =
		currentUser?.profile?.profile_image ||
		"https://i.pravatar.cc/96?img=47";

	return (
		<div className="bg-[#6A6D57] rounded-xl p-8 text-white relative overflow-hidden">
			<div className="absolute top-4 right-4">
				<button className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-xl transition-colors">
					<MoreHorizontal size={20} />
				</button>
			</div>

			<div className="flex flex-col items-center justify-center text-center">
				<div className="relative mb-4">
					<img
						src={avatar}
						alt="avatar"
						className="w-24 h-24 rounded-full ring-4 ring-white/20 shadow-lg object-cover"
					/>
				</div>

				<h2 className="text-2xl font-semibold mb-1">{name}</h2>
				<div className="flex flex-col items-center gap-1 text-white/80 text-sm mb-6">
					<div className="flex items-center gap-2">
						<svg
							className="w-4 h-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
							<polyline points="22,6 12,13 2,6" />
						</svg>
						<span>{email}</span>
					</div>
					<div className="flex items-center gap-2">
						<Calendar size={14} />
						<span>Joined {joined}</span>
					</div>
				</div>

				<button className="bg-white text-[#6A6D57] hover:bg-gray-50 px-8 py-2.5 rounded-lg font-semibold shadow-sm transition-colors text-sm w-full max-w-xs">
					Plus Plan
				</button>
			</div>
		</div>
	);
}
