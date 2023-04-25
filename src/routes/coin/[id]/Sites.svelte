<script>
  import TextCard from '$lib/components/cards/TextCard.svelte';
  export let data = false;
</script>

<div class="my-8">
  <TextCard text="Sites" />
  <div
    class="{`flex flex-wrap items-center
    ${!Object.keys(data).length 
      ? 'bg-gradient-to-r from-[#141414] h-8 w-[50%] rounded-lg to-[#111]'
        : ''
    }`}">
    {#if Object.keys(data).length}
      {#each data?.data?.data[1]?.links?.blockchain_site as site}
        {#if site}
          <a target="_blank"
            rel="noreferrer"
            href="{site}"
            class="inline leading-[1px] text-lg ml-2 text-[#46beff]">
            {site.replace('https://', '').replace('/', '')}
          </a>
          <br />
        {/if}
      {/each}
    {/if}
  </div>
</div>
