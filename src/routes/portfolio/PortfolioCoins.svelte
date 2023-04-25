<script>
  import PortfolioCoin from '$lib/components/cards/coins/PortfolioCoin.svelte';
  import portfolioStore from '$lib/store/portfolio.js';
  import EditModal from './EditModal.svelte'
</script>

<div class="lg:w-full">
  {#each $portfolioStore.tokens == null ? new Array(6) 
  : $portfolioStore.tokens as coin}
    <PortfolioCoin coin="{coin}" />
  {/each}
  {#if $portfolioStore.isEditing !== null}
    <EditModal />
  {/if}
</div>
