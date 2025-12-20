import { create } from "zustand";
import axiosClient from "../api/axiosClient";
import endpoints from "../api/endpoints";

const useEditorialStore = create((set, get) => ({
	editorials: [],
	loading: false,
	error: null,

	fetchEditorials: async () => {
		set({ loading: true, error: null });
		try {
			const response = await axiosClient.get(endpoints.EDITORIAL);
			// Handle both direct array responses and paginated { results: [...] } responses
			const data = Array.isArray(response.data)
				? response.data
				: response.data?.results || [];
			set({ editorials: data, loading: false });
		} catch (error) {
			console.error("Error fetching editorials:", error);
			set({
				error:
					error.response?.data?.message ||
					"Failed to fetch editorials",
				loading: false,
			});
		}
	},

	createEditorial: async (formData) => {
		set({ loading: true, error: null });
		try {
			const response = await axiosClient.post(
				endpoints.EDITORIAL,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			set((state) => ({
				editorials: [response.data, ...state.editorials],
				loading: false,
			}));
			return { success: true, data: response.data };
		} catch (error) {
			console.error("Error creating editorial:", error);
			const errorMsg =
				error.response?.data?.message || "Failed to create editorial";
			set({
				error: errorMsg,
				loading: false,
			});
			return { success: false, error: errorMsg };
		}
	},
}));

export default useEditorialStore;
