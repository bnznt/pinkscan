import { defineComponent, ref } from "@vue/composition-api";
import Logo from '@/assets/logo.svg';
import Search from '@/assets/search.svg';
import Header from '@/components/Header/index.vue';

export default defineComponent({
  name: 'Content',
  inject: ['global'],
  components: { Header },
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