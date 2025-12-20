const endpoints = {
	LOGIN: "/api/v1/auth/login/",
	USERS: "/api/v1/admin/users/",
	USER_STATS: (id) => `/api/v1/admin/users/${id}/statistics/`,
};

export default endpoints;
