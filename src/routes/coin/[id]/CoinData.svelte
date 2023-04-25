<script>
  import TextCard from '$lib/components/cards/TextCard.svelte';
  import { fields } from '../data';
  export let data = null;
</script>

<div class="{`w-full lg:w-[40%]`}">
  <TextCard text="Data" />
  <div
  class="{`text-lg p-4 rounded-lg mt-2 
      bg-gradient-to-l border-[#151515] to-[#111] from-[#151515]
      border-2 ${
        data == null ? 'h-full text-transparent' : 'text-blue-400'
      }`}">
    {#if data}
    {#each fields as field}
    <div class="flex">
      <span>{field.text}&nbsp;</span>
          <span class="colored">
            {#if field.type == 'dol'}
            <span>$</span>
            {/if}
            {data.data ? `${data.data[0][0]?.[field.att]}` : ''}
            {#if field.type == 'per'}
            <span>%</span>
            {/if}
          </span>
        </div>
      {/each}
    {/if}
  </div>
</div>
