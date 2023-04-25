<script>
  import { disclose } from '../actions';
  import { slide } from 'svelte/transition';
  import ind from '$lib/store/indicators.js';
  import searchStore from '$lib/store/search.js';
  import AddTokenModal from './AddTokenModal.svelte';
</script>

{#if $searchStore.data?.data !== null}
  <div class="flex flex-col font-[main]">
    {#each $searchStore?.data?.data as token, index}
      {#if index < 3}
        <div transition:slide class="flex justify-between 
        items-center mb-2 ml-2">
          <span class="w-[40%]">{token.name}</span>
          <span>{token.symbol}</span>
          <button
            on:click="{() => disclose(token)}"
            class="cursor-pointer duration-200 hover:text-black 
                bg-gradient-to-r rounded-full py-1 px-4 from-red-500 to-blue-500">
            Add
          </button>
        </div>
        {#if $ind.open.name}
          <AddTokenModal />
        {/if}
      {/if}
    {:else}
      <span></span>
    {/each}
  </div>
{/if}
