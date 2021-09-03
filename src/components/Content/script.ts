import { defineComponent, ref } from "@vue/composition-api";
import Logo from '@/assets/logo.svg';
import Search from '@/assets/search.svg';

export default defineComponent({
  name: 'Content',
  inject: ['global'],
  components: { Logo, Search },
  props: {
    id: {
      type: String,
      default: 'content'
    },
  },
  setup() { 
    const searchOpen = ref();

    const openSearch = async () => {
      searchOpen.value = true;
    }
    const closeSearch = async () => {
      searchOpen.value = false;
    }

    return {
      searchOpen,
      openSearch,
      closeSearch
    }
  }
})