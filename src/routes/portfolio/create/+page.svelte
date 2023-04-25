<script>
  import ind from '$lib/store/indicators.js';
  import AddedTokens from './AddedTokens.svelte';
  import { createPortfolio } from '../actions.js';
  import portfolioStore from '$lib/store/portfolio.js';
  import SearchedTokens from './SearchedTokens.svelte';
  import SearchInput from '$lib/components/other/SearchInput.svelte';
</script>

<section class="w-full px-2">
  <div class="flex justify-center">
    <div class="lg:w-96">
      <span class="text-white font-[main] text-3xl"> Creat a portfolio. </span>
      <input
        class="mt-4 rounded-[5px] border-b-[1px] border-b-[#222] 
        px-4 py-2 w-full bg-[#171717] text-[22px] font-[main] mb-2"
        bind:value="{$portfolioStore.name}"
        placeholder="Portfolio name"
        name="name"
        type="text" />
      <div class="mt-2 mb-4 text-white flex items-center">
        <i class="bx bxs-circle text-[10px] mr-2"></i>
        <span class="font-[main] text-2xl"> Tokens </span>
      </div>
      <AddedTokens />
      <SearchInput />
      <SearchedTokens />
      {#if $ind.error}
        <span class="text-red-500 font-[main] text-lg">
          {$ind.error} 
        </span>
      {/if}
      <button on:click="{createPortfolio}"
        class="rounded-[5px] mt-2 text-white p-2 
          bg-gradient-to-r duration-300 hover:rounded-3xl from-red-500
          to-blue-500 w-full text-[22px] font-[main] cursor-pointer">
        Create
      </button>
    </div>
  </div>
</section>
