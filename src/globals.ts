import { reactive } from "@vue/composition-api";

const state = reactive({
  sidebarOpen: false,
  searchOpen: false,
  pair: {
    symbol: "0X2170ED0880AC9A755FD29B2688956BD959F933F8",
    address: "0x74E4716E431f45807DCF19f284c7aA99F18a4fbc",
    name_token_1: "ETH",
    name_token_2: "BNB",
    main_net_running: false,
    transactions: [],
  },
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
const setSymbol = (symbol:string) => {
  state.pair.symbol = symbol;
}
const setAddress = (address:string) => {
  state.pair.address = address;
}
const runMainNet = () => {
  state.pair.main_net_running = true;
}
const stopMainNet = () => {
  state.pair.main_net_running = false;
}
const pushTransaction = (transaction:any) => {
  state.pair.transactions.unshift(transaction)
  limitTransactionSize()
}
const setTransactions = (transactions:any) => {
  let oldTransactions = state.pair.transactions
  state.pair.transactions = [].concat(transactions, oldTransactions);
  limitTransactionSize()
}
const limitTransactionSize = () => {
  state.pair.transactions = state.pair.transactions.filter((transaction, index) => {return index < 101})
}

export default {
  state,
  toggleSidebar,
  closeSidebar,
  openSearch,
  closeSearch,
  setSymbol,
  setAddress,
  runMainNet,
  stopMainNet,
  pushTransaction,
  setTransactions
};
