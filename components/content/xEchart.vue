<template>
    <div>
      <client-only>
        <v-chart class="chart" :option="option" autocapitalize autoresize/>
      </client-only>
    </div>
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
  } from 'echarts/components';
  import VChart from 'vue-echarts';
  import { defineComponent } from 'vue';
  
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
      },
    },
    setup({option}) {
      return { option };
    },
  });
  </script>
  
  <style scoped>
  .chart {
    height: 50vh;
  }
  </style>
  