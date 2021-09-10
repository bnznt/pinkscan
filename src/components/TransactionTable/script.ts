import { defineComponent, ref, onMounted } from "@vue/composition-api";
import { getTransactions, getTransactionsCount } from "@/api/transaction.api";
import { getDateTimeFormat, getTimeAgo } from "@/utils/dateTimeFormat";
import { TransactionService } from "@/lib/transactions/TransactionService";
import { dropRight, findIndex } from "lodash"

export default defineComponent({
	name: 'TransactionTable',
	inject: ['global'],
	setup () {
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
		const pairAddress = ref('0x74E4716E431f45807DCF19f284c7aA99F18a4fbc');
		const transactionService = new TransactionService();
		let callMainNet:any;
		onMounted(() => {
			initTable()
		})

		const initTable = () => {
			setTableRows({
				pairAddress: pairAddress.value,
				pageSize: perPage.value,
				page: currentPage.value
			})
			setTotalItems()
			fetchTransactionFromMainNet()
		}
		const setTableRows = async (params:Object) => {
			const transactions = await getTransactions(params);
			let rows:any = parseRows(transactions.data);
			tableRows.value = rows;
		}

		const parseRows = (transactions:any) => {
			let rows:any = [];
			transactions.forEach(function(transaction:any){
				let buy = transaction.type == 'buy',
						quantity = transaction.price / transaction.price_per_token
				
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
						value: `$${numberFormat(transaction.price_per_token)}`,
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
		
		const setTotalItems = async () => {
			const count = await getTransactionsCount({
				pairAddress: pairAddress.value
			})
			totalItems.value = count.data.count
		}

		const fetchTransactionFromMainNet = async () => {

			await transactionService.init({
				nameTokenOne: 'ETH',
				nameTokenTwo: 'BNB',
				nameFactory: 'BUSD'
			});

			callMainNet = setInterval(async () => {
				const transactions = await transactionService.getTransactions();
				
				
				if(transactions.length < 1) {
					return;
				}
	
				let transactionsMap = transactions.map((transaction:any) => ({
					symbol: transaction.symbol,
					address: transaction.address,
					time: new Date(transaction.time).getTime(),
					tx: transaction.tx,
					type: transaction.type.toLowerCase(),
					number_token_1: Number(transaction.numberTokenOne),
					number_token_2: Number(transaction.numberTokenTwo),
					price: Number(transaction.price),
					price_per_token: Number(transaction.pricePerToken),
				}));

				
				let rows:any = parseRows(transactionsMap);

				rows = rows.filter((row) => {
					return findIndex(tableRows.value, function(r) { return r.TxHash.value == row.TxHash.value; } ) == -1
				})
				let newTableRows = tableRows.value
				
				if(currentPage.value > 1) {
					console.log(currentPage.value)
					clearInterval(callMainNet)
					return
				}
				tableRows.value = [ ...rows, ...dropRight(newTableRows, rows.length)]
			}, 1500);
		}

		const onChangePage = (page:Number) => {
			if(page == 1) {
				return
			}
			setTableRows({
				pairAddress: pairAddress.value,
				pageSize: perPage.value,
				page: page
			})
		}
		const numberFormat = (number:any) => {
			return new Intl.NumberFormat('en-US').format(number)
		}

		return {
			navItems,
			navItemActive,
			tableHeaders,
			tableRows,
			totalItems,
			perPage,
			currentPage,
			onChangePage
		}
	},
	methods: {
		activateTabItem: function(index :any) {
			this.navItemActive = index
		},
		truncateAddress: function(address:string) {
			return `${address.slice(0, 6)}...${address.slice(-4)}`
		},
		truncateTx: function(tx:string) {
			return `${tx.slice(0, 12)}...`
		}
	},
})