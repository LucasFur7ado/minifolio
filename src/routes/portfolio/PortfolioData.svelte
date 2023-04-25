<script>
  import portfolioStore from '$lib/store/portfolio.js'
  export let data = null;
</script>

<h1 class="text-white font-[main] text-3xl">Portfolio</h1>
{#if data == null}
  <div class="rounded-lg bg-gradient-to-r from-[#222] to-[#111] w-16 h-6"></div>
{:else}
  <h3>{data?.name} (Cookies)</h3>
{/if}
<br />
<div class="w-full lg:w-full px-4 py-2 border-[1px] flex items-center 
    justify-between rounded-lg border-[#fff1]">
  <span class="font-[main] text-2xl text-[#46beff]">
    {data == null ? '. . .' : `$${$portfolioStore.total.value}`}
  </span>
  <span class="font-[main] text-2xl">
    {data == null ? '. . .' : `${($portfolioStore.total.percentage).toFixed(2)}%`}
  </span>
</div>
<br />
