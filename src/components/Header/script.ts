import { defineComponent, ref, inject } from "@vue/composition-api";
import Logo from '@/assets/logo.svg';
import Search from '@/assets/search.svg';
import { getSymbols, getPairs } from '@/api/pair.api';

export default defineComponent({
  name: 'Header',
  inject: ['global'],
  components: { Logo, Search },
  setup(props) {
    const global = inject('global')
    
    const pairsOptions = ref([]);

    const fetchSymbol = async (q) => {
      const {data: symbols} = await getSymbols(global.state.pair.name_token_1)
      return {
        results: symbols
      };
    }
    const fetchPair = async (q) => {
      let symbol = q ? q : global.state.pair.symbol
      const {data: data} = await getPairs(symbol)
      const pairs = data.map((pair)=>({
        name: `${pair.name_token_1}/${pair.name_token_2}`,
        address: pair.address,
        symbol: pair.symbol,
      }))

      // const results = pairs.filter((pair) => {
      //   return pair.name.toLowerCase().includes(q.toLowerCase()) || pair.addess.toLowerCase().includes(q.toLowerCase())
      // })
      
      pairsOptions.value = pairs
    }

    const onChangeSymbol = function(q) {
      console.log('hello', )
      global.setSymbol(q)
      fetchPair(q)
    }

    return {
      fetchSymbol,
      fetchPair,
      onChangeSymbol,
      pairsOptions
    }
  },
  methods: {
    
  }
})