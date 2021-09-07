import { getHistory } from "@/api/transaction.api";
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
    name: 'PinkLock',
    components: {
        // HomeIcon
    },
    inject: ['global'],
});