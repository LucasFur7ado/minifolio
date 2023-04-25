<script src="https://cdn.jsdelivr.net/npm/chart.js">
  import { onMount } from 'svelte';
  export let chartData = null;
  let myChart;

  const data = {
    labels: chartData?.map((c) => c.coin),
    datasets: [
      {
        data: chartData?.map((c) => c.value),
        backgroundColor: ['#111', '#222', '#333', '#444', '#555'],
        hoverBorderWidth: 4,
        borderRadius: 7,
        offset: 40,
      },
    ],
  };

  const options = {
    cutoutPercentage: 60,
    responsive: true,
    plugins: { legend: { display: false } },
  };

  onMount(() => {
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, { type: 'doughnut', data, options });
  });
</script>

<div class={`${chartData == null ? `bg-gradient-to-r from-[#141414] to-[#111]
w-full h-full rounded-lg` : ''}`}>
  <canvas id="myChart" />
</div>
