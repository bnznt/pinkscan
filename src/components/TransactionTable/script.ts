import { defineComponent, ref, onMounted, inject, computed } from "@vue/composition-api";
import { getTransactions, getTransactionsCount } from "@/api/transaction.api";
import { getDateTimeFormat, getTimeAgo, numberFormat, truncateAddress, truncateTx } from "@/utils/format";

export default defineComponent({
	name: 'TransactionTable',
	inject: ['global'],
	setup () {
		const global:any = inject('global')
		const navItemActive = ref(0)
		const navItems = ref([
			{title: 'DEX Trades'},
			{title: 'Whale Trades'},
			{title: 'Token Transfers'},
			{title: 'Dev Activity'},
			{title: 'Scan Rug'},
		])
		const tableHeaders = ref(['Time (UTC)', 'Trade', 'Price', 'Quantity', 'Value', 'Wallet Maker', 'TxHash'])
		const tableRows = ref([]);
		const totalItems = ref(0);
		const perPage = ref(10);
		const currentPage = ref(1);

		onMounted(() => {
			initTable()
		})

		const initTable = async () => {
			setTotalItems()
			await setTableRows({
				pairAddress: global.state.pair.address,
				pageSize: perPage.value,
				page: currentPage.value
			})
			global.setTransactions(tableRows.value)
		}
		const setTableRows = async (params:Object) => {
			const {data: transactions} = await getTransactions(params);

			tableRows.value = transactions.filter((row:any, index:number) => {return index < perPage.value + 1});
		}

		const parseRows = (transactions:any) => {
			let rows:any = [];
			transactions.forEach(function(transaction:any){
				let buy = transaction.type.toLowerCase() == 'buy',
						transactionPrice = transaction.price_per_token,
						quantity = transaction.price / transactionPrice
				
				rows.push({
					time: {
						value: getDateTimeFormat(transaction.time),
						label: getTimeAgo(transaction.time)
					},
					trade: {
						label: transaction.type.toUpperCase(),
						value: buy
					},
					price: {
						value: `$${numberFormat(transactionPrice)}`,
						label: 'Pancake v2',
					},
					quantity: {
						value: numberFormat(quantity),
						label: 'iLayer'
					},
					value: {
						value: `$${numberFormat(transaction.price)}`,
						label: `${numberFormat(transaction.number_token_2)} BNB`
					},
					walletMaker: {
						value: transaction.address,
						label: 'BSCScan'
					},
					TxHash: {
						value: transaction.tx
					}
				})
			})

			return rows
		}

		const getTableRows = computed(() => {
			let rows:any = global.state.pair.transactions
			
			if (currentPage.value !== 1) {
				rows = tableRows.value;
			}
			
			rows = rows.filter((row:any) => { return Object.keys(row).length})
			rows = rows.sort((a, b) => {return b.time - a.time})
			rows = rows.filter((row:any, index:number) => {return index < perPage.value })
			rows = parseRows(rows);

			return rows
		})
		
		const setTotalItems = async () => {
			const count = await getTransactionsCount({
				pairAddress: global.state.pair.address
			})
			totalItems.value = count.data.count
		}
		const onChangePage = (page:Number) => {
			if(page == 1) {
				return
			}
			setTableRows({
				pairAddress: global.state.pair.address,
				pageSize: perPage.value,
				page: page
			})
		}

		return {
			navItems,
			navItemActive,
			tableHeaders,
			getTableRows,
			tableRows,
			totalItems,
			perPage,
			currentPage,
			onChangePage,
			truncateAddress,
			truncateTx
		}
	},
	methods: {
		activateTabItem: function(index :any) {
			this.navItemActive = index
		},
	},
})