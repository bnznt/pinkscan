import { defineComponent } from "@vue/composition-api";
import Copy from '@/assets/copy.svg';
import Trade from '@/assets/trade.svg';
import GlobeAlt from '@/assets/globe-alt.svg';
import Twitter from '@/assets/twitter.svg';
import Telegram from '@/assets/telegram.svg';

export default defineComponent({
  name: 'Pair',
  inject: ['global'],
  components: {
    Copy,
    Trade,
    GlobeAlt,
    Twitter,
    Telegram
  }
})