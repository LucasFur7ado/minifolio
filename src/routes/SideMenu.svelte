<script>
  import { fade } from 'svelte/transition';
  export let disclose, sections;
</script>

<div transition:fade class="flex flex-col md:hidden w-full h-screen 
fixed top-0 left-0 bg-[#111] z-[2] p-6 text-white justify-between">
  <ul class="flex flex-col">
    {#each sections as link}
      <button on:click="{disclose}"
        class="text-left mx-2 duration-200 
            text-2xl hover:text-[#46beff]">
        <a href="{link.url}">
          {link.title}
        </a>
      </button>
    {/each}
  </ul>
  <button on:click="{disclose}"
    class="hover:text-[#46beff] duration-200 
    text-left text-white text-3xl pl-2">
    Close
  </button>
</div>
