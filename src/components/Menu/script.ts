import { defineComponent } from "@vue/composition-api";
import Home from '@/assets/home.svg';
import Server from '@/assets/server.svg';
import Globe from '@/assets/globe.svg';
import ChevronRight from '@/assets/chevron-right.svg';

export default defineComponent({
  name: 'Menu',
  inject: ['global'],
  data() {
    return {
      menuItems: [
        { name: 'PinkScan', link: '/', icon: 'Home' },
        { name: 'PinkLock', link: '/pinklock', icon: 'Server' },
        {
          name: 'Social Media',
          link: '#',
          type: 'external',
          icon: 'Globe',
          active: false,
          child: [
            { name: 'Telegram', link: 'https://telegram.com', type: 'external' },
            { name: 'Twitter', link: 'https://twitter.com', type: 'external' },
            { name: 'Discord', link: 'https://discord.com', type: 'external' },
          ]
        },
      ]
    }
  },
  components: {
    Home,
    Server,
    Globe,
    ChevronRight
  },
  methods: {
    toggleSubMenu: function(index: any) {
      this.menuItems[index].active = !this.menuItems[index].active
    }
  },
})