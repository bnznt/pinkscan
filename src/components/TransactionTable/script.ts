import { defineComponent, ref } from "@vue/composition-api";

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
    const tableRows = ref([
      {
        time: {
          value: 'Aug 13, 2021  21:44:26',
          label: '6 mins & 26 secs ago'
        },
        trade: {
          label: 'BUY',
          value: true
        },
        price: {
          value: '$0.000000001272',
          label: 'Pancake v2',
        },
        quantity: {
          value: '31,656,800,001',
          label: 'iLayer'
        },
        value: {
          value:'$735.83',
          label: '1.8184 BNB'
        },
        walletMaker: {
          value: '0xF9F6...2bb2',
          label: 'BSCScan'
        },
        TxHash: {
          value: '0xf8bca9d28c...'
        }
      },
      {
        time: {
          value: 'Aug 13, 2021  21:44:26',
          label: '6 mins & 26 secs ago'
        },
        trade: {
          label: 'SELL',
          value: false
        },
        price: {
          value: '$0.000000001272',
          label: 'Pancake v2',
        },
        quantity: {
          value: '31,656,800,001',
          label: 'iLayer'
        },
        value: {
          value:'$735.83',
          label: '1.8184 BNB'
        },
        walletMaker: {
          value: '0xF9F6...2bb2',
          label: 'BSCScan'
        },
        TxHash: {
          value: '0xf8bca9d28c...'
        }
      },
    ]);

    const totalItems = ref(100);
    const perPage = ref(10);
    const currentPage = ref(1);

    return {
      navItems,
      navItemActive,
      tableHeaders,
      tableRows,
      totalItems,
      perPage,
      currentPage,
    }
  },
  methods: {
    activateTabItem: function(index :any) {
      this.navItemActive = index
    }
  },
})