<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Sites from './Sites.svelte';
  import { loadData } from '../actions';
  import CoinData from './CoinData.svelte';
  import MainData from './MainData.svelte';
  import Chart from '$lib/components/charts/Line.svelte';
  import TextCard from '$lib/components/cards/TextCard.svelte';
  import ErrorCard from '$lib/components/cards/ErrorCard.svelte';

  export let data = null;
  onMount(async () => (data = await loadData($page.params.id)));
</script>

<svelte:head>
  <title>{data?.coin?.name ?? 'Bitcoin'} - minifolio</title>
  <meta name="description"
    content="{`${data?.coin?.name ?? 'Bitcoin'} in minifolio`}" />
</svelte:head>

<section class="font-[main] text-2xl break-all w-full">
  {#if data.success == false}
    <ErrorCard />
  {:else if data == null || data}
    <!-- NAME, PRICE, % & ADD TO WATCHLIST BUTTON -->
    <MainData data="{data}" />
    <div class="flex flex-col lg:flex-row pt-6">
      <!-- CHART -->
      <div class="{`w-full lg:w-[60%] lg:pr-4 rounded-lg`}">
        <TextCard text="30 days chart" />
        <Chart id="{$page.params.id}" />
      </div>
      <!-- DATA PANEL -->
      <CoinData data="{data?.data}" />
    </div>
    <!-- SITES -->
    <Sites data="{data}" />
  {/if}
</section>
