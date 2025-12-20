const endpoints = {
	LOGIN: "/api/v1/auth/login/",
	USERS: "/api/v1/admin/users/",
	USER_STATS: (id) => `/api/v1/admin/users/${id}/statistics/`,
	CLOSET_ITEMS: "/api/v1/admin/closet/items/",
};

export default endpoints;
