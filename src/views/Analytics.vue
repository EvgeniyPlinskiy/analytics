<template>
  <div class="row">
    <div class="col-12">
      <h1 class="mt-5 mb-5">Аналитика</h1>
      <h3>Аналитика по визитам</h3>
      <div class="chart" ref="chartdiv"></div>
    </div>
  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { mapGetters } from "vuex";

am4core.useTheme(am4themes_animated);

export default {
  name: "Analytics",
  computed: {
    ...mapGetters(["VISITS", "LEADHIT_SITE_ID"]),
  },
  created() {
    if (this.LEADHIT_SITE_ID !== "5f8475902b0be670555f1bb3") {
      this.$router.push("/autorisation");
    }
  },
  mounted() {
    let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

    chart.paddingRight = 20;

    this.VISITS.map((value) => {
      let date = Date.parse(value.date);
    });

    let data = this.VISITS;

    chart.data = data;
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "visits";

    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    this.chart = chart;
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chart {
  width: 100%;
  height: 500px;
}
</style>