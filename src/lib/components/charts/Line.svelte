<script src="https://cdn.jsdelivr.net/npm/chart.js">
  import { loadChartData } from './actions.js';
  import { onMount } from 'svelte';
  import numeral from 'numeral';
  export let id = null;

  let chartData = null;

  onMount(async () => {
    const res = await loadChartData(id);
    chartData = res?.data[0];
    const times = chartData?.prices.map((p) =>
      new Date(p[0]).toLocaleDateString()
    );
    const prices = chartData?.prices.map((p) => p[1]);
    const data = {
      labels: times,
      datasets: [
        {
          backgroundColor: 'var(--primary)',
          borderColor: '#46beff',
          borderWidth: 2,
          data: prices,
        },
      ],
    };

    const options = {
      plugins: {
        legend: { display: false },
        tooltip: { intersect: false },
      },
      elements: { point: { radius: 0 } },
      scales: {
        y: {
          beginAtZero: false,
          grid: { display: true, color: '#141414' },
          ticks: {
            font: { family: 'main', size: 12 },
            color: '#fff5',
            callback: function (value, index, values) {
              return numeral(value).format('0a');
            },
          },
        },
        x: {
          grid: { display: true, color: '#141414' },
          ticks: {
            color: 'burlywood',
            font: { family: 'main', size: 0 },
          },
        },
      },
    };
    const ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, { type: 'line', data: data, options: options });
  });
</script>

<div>
  <canvas
    class={chartData == null
      ? 'bg-gradient-to-r from-[#151515] to-[#111] h-full w-full rounded-lg mr-8'
      : ''}
    id="myChart" />
</div>
