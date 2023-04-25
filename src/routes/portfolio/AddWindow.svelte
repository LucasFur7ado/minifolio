<script>
  import { slide } from "svelte/transition"
  import searchStore from "$lib/store/search.js"
  import { addTokenToPortfolio } from "./actions"
  import portfolioStore from '$lib/store/portfolio.js'
  import SearchInput from "../../lib/components/other/SearchInput.svelte"
  import ConvertCoin from "../../lib/components/cards/coins/ConvertCoin.svelte"

  let selected = null, amount
</script>

<div transition:slide class="lg:w-80 w-[90%] rounded-lg fixed top-[50%] left-[50%] 
    translate-x-[-50%] translate-y-[-50%] bg-[#111] border-[1px] border-[#202020]
    font-[main] text-center p-4">
  <div class="mb-2">
    <span class="text-2xl">Add token</span>
  </div>
  {#if selected !== null}
    <div class="flex items-center justify-center gap-2">
      <ConvertCoin coin={selected} />
      <button on:click={() => (selected = null)}>
        <i class="text-2xl bx bx-x mb-2 cursor-pointer" />
      </button>
    </div>
    <input type="text" class="mt-1 rounded-[5px] border-b-[1px] border-b-[#222] 
      px-4 py-2 w-full bg-[#171717] text-[22px] font-[main] mb-2"
      placeholder="Amount"
      bind:value={amount}
      name="amount" />
  {:else}
    <SearchInput />
    {#if $searchStore.data?.data !== null}
      {#each $searchStore.data?.data as coin, index}
        {#if index < 4}
          <button on:click={() => (selected = coin)} class="w-full">
            <ConvertCoin {coin} />
          </button>
        {/if}
      {/each}
    {/if}
  {/if}
  <button on:click={() => {
      addTokenToPortfolio(selected.id, amount, selected.name)
      $portfolioStore.isAdding = null
    }}
    class="rounded-[5px] mt-2 text-black p-2 
      bg-gradient-to-r from-white to-[#46beff] duration-300 hover:rounded-3xl
      w-full text-[22px] font-[main] cursor-pointer">
    Add
  </button>
</div>
