<script>
  import Container from './Container.svelte';
  export let coin = null;
</script>

<Container>
  {#if coin !== null}
    <a class="w-full mr-1"
      data-sveltekit-preload-data="tap"
      href="{`/coin/${coin.id}`}">
      <div class="flex items-start flex-col justify-between">
        <div>
          <span> {coin.name} </span>
          <span class="text-[#fff3]"> #{coin.market_cap_rank} </span>
        </div>
        <div class="text-lg flex justify-between items-center gap-2">
          <div>
            <span class="text-[#46beff]"> ${coin.current_price} </span>
            <span> {coin.price_change_percentage_24h}% </span>
          </div>
        </div>
      </div>
    </a>
  {/if}
</Container>
