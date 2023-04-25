<script>
  import AddWindow from "./AddWindow.svelte"
  import { deletePortfolio } from "./actions"
  import portfolioStore from "$lib/store/portfolio.js"
</script>

<div class="pt-8">
  <button
    on:click={() => $portfolioStore.isAdding = true}
    class="text-[18px] bg-blue-400 text-black 
    rounded-full px-8 py-2 font-[main] mr-2">
    Add coin
  </button>
  {#if $portfolioStore.isAdding !== null}
    <AddWindow />
  {/if}
  <button
    on:click={deletePortfolio}
    class="text-[18px] bg-red-500 rounded-full 
    px-8 py-2 font-[main]">
    Delete portfolio
  </button>
</div>
