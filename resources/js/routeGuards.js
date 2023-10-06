// routeGuards.js
import store from "./blogStore"; // Assuming your Vuex store is in a separate file

export const requireAuth = (to, from, next) => {
    const isAuthenticated = store.state["isAuthenticated"]; // Adjust the getter path as needed
    if (isAuthenticated) {
        // User is authenticated, allow access to the route
        next();
    } else {
        // User is not authenticated, redirect to the login page (or any other page)
        next("/login");
    }
};
