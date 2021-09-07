import { defineComponent } from "@vue/composition-api";
import Logo from '@/assets/logo.svg';
import Menu from '@/components/Menu/index.vue';

export default defineComponent({
  name: 'Sidebar',
  inject: ['global'],
  props: {
    id: {
      type: String,
      default: 'sidebar'
    },
    classes: {
      type: String,
      default: 'min-h-screen transform transition-transform duration-500 flex-shrink-0 lg:fixed z-10 left-0 top-0'
    }
  },
  components: {
    Logo,
    Menu
  },
  computed: {
    getClasses: function () {
      let defaultClass :any = this.classes
      return defaultClass + ' border-r border-gray-200 dark:border-white dark:border-opacity-8';
    }
  }
})