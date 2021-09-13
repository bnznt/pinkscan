import { defineComponent, inject, onMounted, onUnmounted } from "@vue/composition-api";
import Pair from '@/components/Pair/index.vue';
import Chart from '@/components/Chart/index.vue';
import TransactionTable from '@/components/TransactionTable/index.vue';
export default defineComponent({
    name: 'Home',

    components: {
        Pair,
        Chart,
        TransactionTable
    },
    setup() {

        const global:any = inject('global')

        onMounted(async () =>{
            global.runMainNet()
        })
        onUnmounted(() =>{
            global.stopMainNet()
        })
    }
});