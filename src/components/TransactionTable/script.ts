import { defineComponent, ref, onMounted } from "@vue/composition-api";
import { getTransactions, getTransactionsCount } from "@/api/transaction.api";
import { getDateTimeFormat, getTimeAgo } from "@/utils/dateTimeFormat";

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

    onMounted(() => {
      initTable()
    })

    const initTable = async () => {
      setTableRows({
        pairAddress: pairAddress.value,
        pageSize: perPage.value,
        page: currentPage.value
      })
      setTotalItems()
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

    const onChangePage = (page:Number) => {
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