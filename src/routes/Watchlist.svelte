<script>
  import { onMount } from 'svelte';
  import dataStore from '$lib/store/data.js';
  import { loadWatchlist } from './actions.js';
  import ErrorCard from '$lib/components/cards/ErrorCard.svelte';
  import WatchlistCoin from '$lib/components/cards/coins/WatchlistCoin.svelte';

  let data = null;
  onMount(async () => (data = await loadWatchlist()));
</script>

<div>
  {#if data?.success == false}
    <ErrorCard />
  {:else if data == null}
    <span class="font-[main] text-lg ml-2">Loading watchlist...</span>
  {:else if data?.data}
    <!-- LOADED -->
    {#each $dataStore?.watchlist as tks}
      <WatchlistCoin coin="{tks}" />
    {:else}
      <span class="font-[main] text-lg ml-2">Watchlist is empty</span>
    {/each}
  {/if}
</div>
