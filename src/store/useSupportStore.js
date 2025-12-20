import { create } from "zustand";
import axiosClient from "../api/axiosClient";
import endpoints from "../api/endpoints";

const useSupportStore = create((set, get) => ({
	tickets: [],
	count: 0,
	next: null,
	previous: null,
	loading: false,
	error: null,

	fetchTickets: async (page = 1, status = "") => {
		set({ loading: true, error: null });
		try {
			const params = {
				page,
				status:
					status && status !== "All"
						? status.toLowerCase()
						: undefined,
			};

			const response = await axiosClient.get(endpoints.SUPPORT_TICKETS, {
				params,
			});

			set({
				tickets: response.data.results,
				count: response.data.count,
				next: response.data.next,
				previous: response.data.previous,
				loading: false,
			});
		} catch (error) {
			console.error("Error fetching tickets:", error);
			set({
				error:
					error.response?.data?.message ||
					"Failed to fetch support tickets",
				loading: false,
			});
		}
	},

	updateTicketStatus: async (id, status) => {
		set({ loading: true, error: null });
		try {
			// Assuming there's a PATCH endpoint for status update.
			// Adjust if the backend expects something else.
			const response = await axiosClient.patch(
				`${endpoints.SUPPORT_TICKETS}${id}/`,
				{
					status,
				}
			);

			// Update local state with response data
			set((state) => ({
				tickets: state.tickets.map((t) =>
					t.id === id ? response.data : t
				),
				loading: false,
			}));
			return { success: true };
		} catch (error) {
			console.error("Error updating ticket status:", error);
			set({
				error: "Failed to update ticket status",
				loading: false,
			});
			return { success: false, error: "Failed to update status" };
		}
	},

	sendTicketReply: async (id, reply) => {
		set({ loading: true, error: null });
		try {
			const response = await axiosClient.post(
				`${endpoints.SUPPORT_TICKETS}${id}/reply/`,
				{
					message: reply,
				}
			);

			// Update local ticket with response data (contains updated status and replies)
			set((state) => ({
				tickets: state.tickets.map((t) =>
					t.id === id ? response.data : t
				),
				loading: false,
			}));

			return { success: true };
		} catch (error) {
			console.error("Error sending reply:", error);
			set({
				error: "Failed to send reply",
				loading: false,
			});
			return { success: false, error: "Failed to send reply" };
		}
	},
}));

export default useSupportStore;
