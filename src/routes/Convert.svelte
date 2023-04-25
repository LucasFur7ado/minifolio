<script>
  import { slide } from "svelte/transition"
  import convertStore from "$lib/store/convert.js"
  import { select, clearResult } from "./actions.js"
  import ConvertInput from "../lib/components/other/ConvertInput.svelte"
  import ConvertCoin from "../lib/components/cards/coins/ConvertCoin.svelte"
  export let data

  $: {
    if (data?.data && $convertStore.values[0] == null) {
      $convertStore.coins = [data.data.find((tk) => tk.id == "bitcoin"), 
      data.data.find((tk) => tk.id == "ethereum")]
      $convertStore.cached = data.data.filter((tk, index) => {
        if (index < 4) return tk
      })
        $convertStore.values = [1, +(($convertStore.coins[0].current_price * 1) 
        / $convertStore.coins[1].current_price).toFixed(2)]
    }
  }
</script>

<div class="font-[main] text-lg rounded-lg">
  <ConvertInput nr={0} />
  <ConvertInput nr={1} />
  {#if $convertStore.loading}
    <span class="font-[main] text-lg mb-2 ml-2">Searching...</span>
  {/if}
  {#if $convertStore?.data?.data?.length}
    <div
      class="font-[main] text-lg mb-2 pl-2 flex 
        items-center justify-between">
      <span>Results</span>
      <button on:click={clearResult}>
        <i class="duration-200 hover:text-[#46beff] text-2xl bx bx-x" />
      </button>
    </div>
    {#each $convertStore.data.data as coin, index}
      {#if index < 3}
        <ConvertCoin func={select} {coin} />
      {/if}
    {/each}
  {:else if $convertStore.data.fetched && !$convertStore?.data?.data?.length}
    <span class="font-[main] text-lg mb-2 ml-2">No results</span>
  {/if}
  {#if $convertStore.opens[1] || $convertStore.opens[0]}
    <div transition:slide class="pt-2">
      {#each $convertStore.cached as coin}
        <ConvertCoin func={select} {coin} />
      {/each}
    </div>
  {/if}
</div>
