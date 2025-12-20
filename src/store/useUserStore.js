import { create } from "zustand";
import axiosClient from "../api/axiosClient";
import endpoints from "../api/endpoints";

const useUserStore = create((set) => ({
	users: [],
	count: 0,
	next: null,
	previous: null,
	loading: false,
	error: null,

	fetchUsers: async (page = 1, search = "") => {
		set({ loading: true, error: null });
		try {
			const response = await axiosClient.get(endpoints.USERS, {
				params: { page, search },
			});
			const { results, count, next, previous } = response.data;
			set({
				users: results,
				count,
				next,
				previous,
				loading: false,
			});
		} catch (error) {
			console.error("Error fetching users:", error);
			set({
				error: error.response?.data?.message || "Failed to fetch users",
				loading: false,
			});
		}
	},

	updateUserStatus: async (id, statusAction) => {
		set({ error: null }); // Don't set global loading to true
		try {
			const response = await axiosClient.post(
				`${endpoints.USERS}${id}/status/`,
				{
					status_action: statusAction,
				}
			);

			const updatedUser = response.data;

			set((state) => ({
				users: state.users.map((user) =>
					user.id == id ? updatedUser : user
				),
			}));
			return true;
		} catch (error) {
			console.error("Error updating user status:", error);
			set({
				error:
					error.response?.data?.message ||
					"Failed to update user status",
			});
			return false;
		}
	},
}));

export default useUserStore;
