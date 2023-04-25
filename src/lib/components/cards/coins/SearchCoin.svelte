<script>
  export let coin = null;
</script>

<button class="mx-1 w-full">
  <a href="{`/coin/${coin.id}`}">
    <div class="{`bg-gradient-to-l rounded-lg from-[#151515] 
    to-[#111] py-1 px-2 border-2 duration-300 border-[#151515] w-full
    mb-2 mr-1 flex flex-col text-white text-2xl font-[main] justify-center
    cursor-pointer shadow-md shadow-transparent hover:shadow-[#46beff33]`}">
      {#if coin !== null}
        <div class="flex items-center justify-between">
          <div>
            <span> {coin.name} </span>
            <span class="text-[#fff3]"> #{coin.market_cap_rank} </span>
          </div>
        </div>
      {/if}
    </div>
  </a>
</button>
