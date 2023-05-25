
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
GridComponent,
ToolboxComponent,
MarkPointComponent,
MarkAreaComponent,
MarkLineComponent,
DataZoomComponent
} from 'echarts/components';
import { THEME_KEY } from 'vue-echarts';
import { ref,defineComponent } from 'vue';


use([
  CanvasRenderer,
  LineChart,
  GridComponent,MarkPointComponent,
  MarkAreaComponent,
  MarkLineComponent,
  ToolboxComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent
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
        console.log(option);
        const color = useColorMode();
        provide(THEME_KEY, color.value);
        const getValue = () => {
          return JSON.parse(JSON.stringify(option));
        };
        const options = ref(option);
        let refrash = 0;
        watch(()=>color.value, (v,p) => {
          let d  = getValue();
          d.darkMode = v === 'light' ? 'dark' : 'light';
          refrash++;
          options.value = d;
        });
        return () => (
            <div>
              <figure class="mx-2">
                <client-only>
                  <v-chart option={options} key={refrash} style="height: 500px;border-radius: 10px;" autocapitalize autoresize/>
                </client-only>
              </figure>
            </div>
        )
    },
  });
  
  