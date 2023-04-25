<script>
  import DefaultCoin from '$lib/components/cards/coins/DefaultCoin.svelte';
  export let data;
</script>

<!-- HOME PAGE COINS LIST -->
<div class="md:grid md:grid-cols-3 md:gap-2 rounded-lg">
  {#each data?.data ?? new Array(27) as coin}
    <DefaultCoin coin="{coin}" />
  {/each}
</div>
