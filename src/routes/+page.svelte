<script>
  import BTC from './BTC.svelte';
  import { onMount } from 'svelte';
  import Coins from './Coins.svelte';
  import Search from './Search.svelte';
  import Convert from './Convert.svelte';
  import { loadData } from './actions.js';
  import Watchlist from './Watchlist.svelte';
  import ind from '$lib/store/indicators.js';
  import IconButtons from './IconButtons.svelte';
  import PortfolioWidget from './PortfolioWidget.svelte';
  import TextCard from '$lib/components/cards/TextCard.svelte';
  import ErrorCard from '$lib/components/cards/ErrorCard.svelte';

  let data = null;
  onMount(async () => (data = await loadData()));
</script>

<svelte:head>
  <title>Minifolio - by Lucas</title>
  <meta name="description" content="Criptocurrencies data for chads" />
</svelte:head>

<section class="break-all w-full lg:flex">
  {#if data?.success == false}
    <ErrorCard />
    <!-- LOADING & LOADED -->
  {:else if data == null || data}
    <div class="lg:w-[30%] pt-2">
      <BTC data="{data}" />
      <div class="text-white flex flex-col mb-4 lg:pr-6">
        <TextCard text="Portfolio" />
        <PortfolioWidget />
      </div>
      <div class="text-white flex-col mb-4 hidden md:flex lg:pr-6">
        <TextCard text="Convert" />
        <Convert data="{data}" />
      </div>
    </div>
    <div class="lg:w-[70%]">
      <div class="text-white flex items-center justify-between mb-4">
        <TextCard text="Market" />
        <IconButtons />
      </div>
      {#if $ind.active == 1}
        <Search />
      {/if}
      {#if $ind.active !== 2}
        <Coins data="{data}" />
      {:else if $ind.active == 2}
        <Watchlist />
      {/if}
      <div class="md:hidden duration-300 hover:rounded-3xl bg-gradient-to-r 
			    from-white to-[#46beff] mt-8 mb-2 w-full p-1 rounded-lg">
        <button
          class="duration-300 hover:rounded-3xl 
			      bg-[#111] font-[main] text-[18px] w-full rounded-lg px-4 py-2">
          See more
        </button>
      </div>
    </div>
  {/if}
</section>
