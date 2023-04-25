<script>
  export let func = null;
</script>

<button on:click="{func == null ? () => null : func}" class="mx-1 w-full">
  <div class="{`bg-gradient-to-l rounded-lg from-[#151515] 
    to-[#111] py-1 px-2 border-2 duration-300 border-[#151515] w-full
    mb-2 mr-1 flex flex-col text-white text-2xl font-[main] justify-center
    cursor-pointer shadow-md shadow-transparent hover:shadow-[#46beff33] h-20`}">
    <slot />
  </div>
</button>
