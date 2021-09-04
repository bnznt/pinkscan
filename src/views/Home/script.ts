import { defineComponent, ref } from "@vue/composition-api";
import Pair from '@/components/Pair/index.vue';
import TransactionTable from '@/components/TransactionTable/index.vue';

export default defineComponent({
    name: 'Home',

    components: {
        Pair,
        TransactionTable
    },
});