<script>
  import { slide } from 'svelte/transition';
  import searchStore from '$lib/store/search.js';
  import SearchInput from '../lib/components/other/SearchInput.svelte';
  import SearchCoin from '$lib/components/cards/coins/SearchCoin.svelte';
</script>

<div transition:slide class="mb-4">
  <SearchInput />
  {#if $searchStore?.data?.data?.length}
    {#each $searchStore.data.data as coin, index}
      {#if index < 5}
        <SearchCoin coin="{coin}" />
      {/if}
    {/each}
  {/if}
</div>
