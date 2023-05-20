<template>
    <figure class="mx-2">
      <client-only>
        <v-chart :manual-update="true" ref="chart" style="height: 500px;" autocapitalize autoresize/>
      </client-only>
    </figure>
  </template>
  
  <script lang="ts">
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
  import VChart from 'vue-echarts';
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
    name: 'xEchart',
    components: {
      VChart,
    },
    props: {
      option: {
        type: Object,
        default: {},
      }
    },    
    setup({option}) {
      const chart = ref(null);
      const color = useColorMode();
      var options = JSON.parse(JSON.stringify(option))
      onMounted(() => {
        console.log('mounted');
        console.log(chart.value);
        chart.value.setOption(options);
      });
      watch(()=>color.value, (v,p) => {
        console.log('color mode changed');
        options.darkMode = v === 'dark';
        options = JSON.parse(JSON.stringify(options));
        console.log(options);
      });
      return {
        chart,
      };
    },
  });
  </script>
  
  <style scoped>
  </style>
  