<script>
  import { addToWatchlist } from '../actions';
  import { page } from '$app/stores';
  export let data = null;
  let saved = false;

  $: if (data?.data?.isFav) saved = true;
</script>

<div class="flex items-center justify-between">
  <!-- NAME & # -->
  {#if !Object.keys(data).length}
    <div class="bg-gradient-to-r from-[#222] to-[#111] 
      h-12 w-32 rounded-lg">
    </div>
  {:else}
    <div class="h-12">
      <span class="text-4xl">
        {data?.data?.coin?.name}
      </span>
      <span class="text-[#fff3]">
        #{data?.data?.coin?.market_cap_rank}
      </span>
    </div>
  {/if}
  <!-- ADD TO WATCHLIST BUTTON -->
  <button on:click="{() => {
      addToWatchlist($page.params.id);
      saved = !saved;
    }}">
    <i class="{`bx bx${saved ? 's' : ''}-bookmark 
        opacity-[${saved ? '1' : '.5'}] 
        cursor-pointer duration-200 hover:opacity-[1]`}"></i>
  </button>
</div>
<!-- PRICE & % -->
{#if !Object.keys(data).length}
  <div class="bg-gradient-to-r from-[#222] to-[#111] 
    h-4 w-32 rounded-lg mt-2">
  </div>
{:else}
  <div class="text-lg rounded-lg">
    <span class="text-[#46beff]">
      ${data?.data?.coin?.current_price}
    </span>
    <span>
      {data?.data?.coin?.price_change_percentage_24h} %
    </span>
  </div>
{/if}
