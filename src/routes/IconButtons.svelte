<script>
  import ind from '$lib/store/indicators.js';
  import { disclose } from './actions.js';
</script>

<div class="flex items-center text-2xl">
  <!-- WATCHLIST BUTTON -->
  <button type="submit" on:click="{() => disclose(2)}">
    <i class="{`bx bx${$ind.active == 2 ? 's' : ''}-bookmark 
    opacity-[${$ind.active == 2 ? '1' : '.5'}] mr-2 
    cursor-pointer duration-200 hover:opacity-[1]`}"></i>
  </button>
  <!-- SEARCH BUTTON -->
  <button on:click="{() => disclose(1)}">
    <i class="bx bx-search cursor-pointer duration-200 
    hover:opacity-[1] opacity-[.5]"></i>
  </button>
</div>
