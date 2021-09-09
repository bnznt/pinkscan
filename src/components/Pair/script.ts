import { defineComponent, ref, onMounted, inject } from "@vue/composition-api";
import { getTotalSupply } from "@/api/pair.api";
import Copy from '@/assets/copy.svg';
import Trade from '@/assets/trade.svg';
import GlobeAlt from '@/assets/globe-alt.svg';
import Twitter from '@/assets/twitter.svg';
import Telegram from '@/assets/telegram.svg';

export default defineComponent({
  name: 'Pair',
  inject: ['global'],
  setup() {
    const global = inject('global')
    const totalSupply = ref()
    const setTotalSupply = async () => {
      const { data: data } = await getTotalSupply(global.state.pair.symbol)
      totalSupply.value = data.result
    }
    onMounted(()=>{
      setTotalSupply()
    })

    const numberFormat = (number:any) => {
      return new Intl.NumberFormat('en-US').format(number)
    }

    return {
      totalSupply,
      numberFormat
    }
  },
  components: {
    Copy,
    Trade,
    GlobeAlt,
    Twitter,
    Telegram
  }
})