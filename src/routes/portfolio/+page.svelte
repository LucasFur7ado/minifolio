<script>
  import { onMount } from 'svelte';
  import IsEmpty from './IsEmpty.svelte';
  import { loadPortfolio } from './actions';
  import PortfolioData from './PortfolioData.svelte';
  import portfolioStore from '$lib/store/portfolio.js';
  import PortfolioCoins from './PortfolioCoins.svelte';
  import Donut from '$lib/components/charts/Donut.svelte';
  import PortfolioOptions from './PortfolioOptions.svelte';
  import ErrorCard from '$lib/components/cards/ErrorCard.svelte';

  let data = null;
  onMount(async () => (data = await loadPortfolio()));
</script>

<svelte:head>
  <title>Portfolio - minifolio</title>
  <meta name="description" content="{`Portfolio minifolio`}" />
</svelte:head>

<section class="w-full px-2">
  {#if data?.success == false}
    <!-- ERROR -->
    <ErrorCard />
  {:else if data !== null && data?.data == null}
    <!-- EMPTY PORTFOLIO -->
    <IsEmpty />
  {:else if data == null || data?.data?.tokens?.length}
    <!-- LOADING AND LOADED -->
    <div class="flex flex-col md:flex-row justify-between">
      <!-- PORTFOLIO INFO & OPTIONS -->
      <div class="w-full md:w-[50%]">
        <PortfolioData data="{data?.data}" />
        <PortfolioCoins />
        <PortfolioOptions />
      </div>
      <!-- DONUT CHART -->
      <div class="w-full pt-8 md:p-0 md:w-[40%]">
        {#if data == null}
          <Donut />
        {:else}
          <Donut
            chartData="{$portfolioStore.tokens?.map(t => {
              return {
                coin: t.symbol.toUpperCase(),
                value: t.value,
              };
            })}" />
        {/if}
      </div>
    </div>
  {/if}
</section>
