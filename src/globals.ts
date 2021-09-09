import { reactive, readonly } from "@vue/composition-api";

const state = reactive({
  sidebarOpen: false,
  searchOpen: false,
  pair: {
    symbol: "0X2170ED0880AC9A755FD29B2688956BD959F933F8",
    address: "0x74E4716E431f45807DCF19f284c7aA99F18a4fbc",
    name_token_1: "ETH",
    name_token_2: "BNB",
  }
});

const toggleSidebar = function () {
  state.sidebarOpen = !state.sidebarOpen;
}

const closeSidebar = function () {
  state.sidebarOpen = false;
}

const openSearch = () => {
  state.searchOpen = true;
}
const closeSearch = () => {
  state.searchOpen = false;
}
const setSymbol = (symbol) => {
  state.pair.symbol = symbol;
}
const setAddress = (address) => {
  state.pair.address = address;
}

export default {
  state,
  toggleSidebar,
  closeSidebar,
  openSearch,
  closeSearch,
  setSymbol,
  setAddress
};
