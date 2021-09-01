import { getHistory } from "@/api/transaction.api";
import { defineComponent, ref } from "@vue/composition-api";
import HomeIcon from '@/assets/home.svg';

export default defineComponent({
    name: 'Home',

    components: {
        HomeIcon
    },

    setup() {
        const transactions = ref([]);
        const currentPage = ref(1);
        const pageSize = ref(50);

        const getTransactions = async () => {
            const { data } = await getHistory();

            transactions.value = data;
        }

        return {
            transactions,
            currentPage,
            pageSize
        }
    }
});