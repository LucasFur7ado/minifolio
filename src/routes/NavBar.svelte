<script>
  import { sections } from '$lib/assets/data/sections.js';
  import logo from '$lib/assets/images/logo.png';
  import SideMenu from './SideMenu.svelte';

  const disclose = () => (open = !open);
  let open = false;
</script>

<nav class="font-[main] w-full bg-[#111] p-4 xl:px-32 
lg:py-8 flex items-center justify-between">
  <div class="text-white text-3xl flex items-center 
    justify-center">
    <img class="w-12 mr-4" src={logo} alt="minifolio" />
    <h1>minifolio</h1>
  </div>
  <ul class="flex items-center hidden md:flex">
    {#each sections as link}
      <div class="mx-2 text-2xl group">
        <a href={link.url}>
          {link.title}
        </a>
        <hr
          class="border-[0px] duration-200 
          group-hover:border-[2px]
          group-hover:w-full w-0" />
      </div>
    {/each}
  </ul>
  <button
    class="duration-200 hover:text-[#46beff] 
    md:hidden text-white text-2xl"
    on:click={disclose}>
    <i class="bx bx-menu" />
  </button>
  {#if open}
    <SideMenu {disclose} {sections} />
  {/if}
</nav>
