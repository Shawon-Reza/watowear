import axios from "axios";

const axiosClient = axios.create({
	// baseURL: "http://10.10.13.75:8000",
	baseURL: "https://endlessly-unified-guppy.ngrok-free.app",
});

axiosClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("access_token");
		if (token) {
			config.headers.set("Authorization", `Bearer ${token}`);
		}

		// Add ngrok and csrf headers
		config.headers.set("ngrok-skip-browser-warning", "true");
		config.headers.set("x-requested-with", "XMLHttpRequest");

		const csrfToken = document.cookie
			.split("; ")
			.find((row) => row.startsWith("csrftoken="))
			?.split("=")[1];

		if (csrfToken) {
			config.headers.set("x-csrftoken", csrfToken);
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosClient;
