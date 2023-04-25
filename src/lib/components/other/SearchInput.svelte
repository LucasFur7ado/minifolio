<script>
  import searchStore from '$lib/store/search.js';
  import { search } from '../../../routes/actions';
  import { resetSearch } from '../../../routes/actions';
</script>

<form on:submit="{search}"
  class="mb-2 flex items-center justify-center gap-2">
  <input name="searchedText" 
    class="rounded-[5px] border-b-[1px] border-b-[#222] 
  px-4 py-2 w-full bg-[#171717] text-[22px] font-[main]"
    placeholder="Search a token"
    type="text" />
  <button class="p-4 bg-[#222] rounded-lg 
    flex items-center justify-center">
    <i class="bx bx-search"></i>
  </button>
</form>
<div class="mb-2">
  {#if $searchStore.loading}
    <span class="ml-2 font-[main] text-lg"> Searching... </span>
  {:else if $searchStore.data?.data !== null 
    && !$searchStore?.data?.data?.length}
    <span class="ml-2 font-[main] text-lg"> No results </span>
  {:else if $searchStore.searchedTokens !== null 
    && $searchStore?.data?.data?.length}
    <div class="font-[main] text-lg pl-2 flex 
        items-center justify-between">
      <span>Results</span>
      <button on:click="{resetSearch}">
        <i class="duration-200 hover:text-[#46beff] text-2xl bx bx-x"></i>
      </button>
    </div>
  {/if}
</div>

