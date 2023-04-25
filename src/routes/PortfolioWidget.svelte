<script>
  import { onMount } from 'svelte';
  import { getPortfolio } from './actions.js';

  let portfolio = null;
  onMount(async () => (portfolio = await getPortfolio()));
</script>

{#if portfolio == null}
  <div class="my-2">
    <span class="text-lg font-[main]">Loading portfolio...</span>
  </div>
{:else if !portfolio}
  <div class="font-[main] pl-4 lg:pl-6 text-lg flex items-center">
    <span>No portfolio yet.</span>
    <a
      href="/portfolio"
      class="bg-gradient-to-l from-white to-[#46beff]
        rounded-3xl py-1 px-4 ml-2 text-black">Create</a>
  </div>
{:else}
  <a href="/portfolio">
    <div
      class="hover:bg-[#fff1] duration-200 font-[main] 
      px-4 lg:px-6 border-[1px] border-[#fff1] cursor-pointer
      rounded-lg py-2 text-lg flex items-center justify-between">
      <span>{portfolio?.name}</span>
      <span class="text-[#46beff] text-2xl ml-2">
        ${portfolio?.total.toFixed(0)}
      </span>
    </div>
  </a>
{/if}
