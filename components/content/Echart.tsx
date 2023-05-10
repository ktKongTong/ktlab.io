import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
GridComponent,
ToolboxComponent,
} from 'echarts/components';
import { ref, defineComponent } from 'vue';

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  ToolboxComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);
export default defineComponent({
    name: 'Echart',
    props: {
      option: {
        type: Object,
        default: {},
      },
    },
    setup({option}, ctx) {
        const options = ref();
        console.log(option);
        options.value = option;
        console.log(option);
        return () => (
            <div>
                hleeo
                <client-only>
                 <v-chart class="chart" option="options.value" />
            </client-only>

            </div>
        )
    },
  });
  
  