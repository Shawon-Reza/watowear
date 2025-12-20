import { create } from "zustand";
import axiosClient from "../api/axiosClient";
import endpoints from "../api/endpoints";

const useClosetStore = create((set, get) => ({
	items: [],
	count: 0,
	next: null,
	previous: null,
	loading: false,
	error: null,

	fetchClosetItems: async (
		page = 1,
		search = "",
		status = "",
		category = ""
	) => {
		set({ loading: true, error: null });
		try {
			const params = {
				page,
				search: search || undefined,
				status: status && status !== "all" ? status : undefined,
				category: category && category !== "all" ? category : undefined,
			};

			const response = await axiosClient.get(endpoints.CLOSET_ITEMS, {
				params,
			});

			set({
				items: response.data.results,
				count: response.data.count,
				next: response.data.next,
				previous: response.data.previous,
				loading: false,
			});
		} catch (error) {
			console.error("Error fetching closet items:", error);
			set({
				error:
					error.response?.data?.message ||
					"Failed to fetch closet items",
				loading: false,
			});
		}
	},

	archiveItem: async (id) => {
		// Placeholder for archive functionality if endpoint becomes available
		// set({ loading: true });
		try {
			// await axiosClient.post(`${endpoints.CLOSET_ITEMS}${id}/archive/`);
			// To refetch after archive:
			// await get().fetchClosetItems();
			return true;
		} catch (error) {
			console.error("Error archiving item:", error);
			set({ error: "Failed to archive item" });
			return false;
		}
	},
}));

export default useClosetStore;
