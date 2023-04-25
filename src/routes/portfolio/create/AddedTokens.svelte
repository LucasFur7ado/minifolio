<script>
  import portfolioStore from '$lib/store/portfolio.js';
  import { slide } from 'svelte/transition';
  import { removeToken } from '../actions';
</script>

{#if $portfolioStore.addedTokens !== null}
  {#each $portfolioStore?.addedTokens as token}
    <div transition:slide
      class="mt-2 mb-4 rounded-3xl py-2 px-4 bg-[#151515] font-[main] flex 
      items-center justify-between">
      <span>{token.name}</span>
      <span>{token.amount}</span>
      <button on:click="{() => removeToken(token.id)}">
        <i class="text-2xl bx bx-x cursor-pointer"></i>
      </button>
    </div>
  {/each}
{/if}
