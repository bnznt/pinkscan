import { reactive, readonly } from "@vue/composition-api";

const state = reactive({
  sidebarOpen: false
});

const toggleSidebar = function () {
  state.sidebarOpen = !state.sidebarOpen;
}

const closeSidebar = function () {
  state.sidebarOpen = false;
}

export default {
  state: readonly(state),
  toggleSidebar,
  closeSidebar
};
