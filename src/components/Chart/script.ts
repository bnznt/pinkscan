import { defineComponent, onMounted } from "@vue/composition-api";
import PinkScanDatafeed from "./PinkScanDatafeed";

export default defineComponent({
    name: 'Chart',

    props: {
        options: {
            type: Object as any,
        },
    },

    setup(props) {
        const initChart = () => {
            if (!window.TradingView) return;

            const tvWidget = new window.TradingView.widget({
                ...props.options,
                debug: true,
                symbol: 'ETH/BNB',
                datafeed: PinkScanDatafeed,
                interval: '1',
                container: 'chart',
                library_path: '/charting_library/',
                locale: 'en',
                fullscreen: false,
                autosize: true,
                theme: getTheme()
            });

            tvWidget.onChartReady(() => {
                console.log('Chart has loaded!')
            });
        }

        const getTheme = () => {
            console.log('darkmode: ' + document.querySelector('html').classList.contains('dark'))
            return document.querySelector('html').classList.contains('dark') ? 'Dark' : 'Light'
        }

        onMounted(() => {
            initChart();
        });

        return {

        }
    }
});