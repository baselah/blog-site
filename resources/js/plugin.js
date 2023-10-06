import secureLocalStorage from "react-secure-storage";

export const localStoragePlugin = (store) => {
    // Subscribe to mutation events
    store.subscribe((mutation, state) => {
        // Save the state to localStorage under a specific key
        secureLocalStorage.setItem("myAppStore", JSON.stringify(state));
    });

    // Load the state from localStorage when the store is initialized
    const localState = JSON.parse(secureLocalStorage.getItem("myAppStore"));
    if (localState) {
        store.replaceState({ ...store.state, ...localState });
    }
};
