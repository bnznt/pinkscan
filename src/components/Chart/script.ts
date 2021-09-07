import { defineComponent, onMounted, PropType } from "@vue/composition-api";

declare const TradingView: any;

export default defineComponent({
    name: 'Chart',

    props: {
        options: {
            type: Object as any,
            required: true
        },
        // bars: {
        //     type: Array as PropType<Bar[]>,
        //     required: true
        // }
    },

    setup(props) {
        const initChart = () => {
            if (!TradingView) return;

            new TradingView.widget({
                ...props.options,
                container: 'chart'
            });
        }

        onMounted(() => {
            initChart();
        });

        return {

        }
    }
});