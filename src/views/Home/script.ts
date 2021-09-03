import { defineComponent, ref } from "@vue/composition-api";
import HomeIcon from '@/assets/home.svg';
import Pair from '@/components/Pair/index.vue';

export default defineComponent({
    name: 'Home',

    components: {
        HomeIcon,
        Pair
    },
});