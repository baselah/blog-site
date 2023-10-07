export default {
    setUser(state, user) {
        state.currentUser = user;
    },
    setToken(state, token) {
        state.token = token;
    },
    setAuth(state, isAuthenticated) {
        state.isAuthenticated = isAuthenticated;
    },
    clearAuthData(state) {
        state.currentUser = null;
        state.token = null;
        state.isAuthenticated = false;
    },
};
