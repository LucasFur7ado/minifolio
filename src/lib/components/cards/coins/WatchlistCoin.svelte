<script>
  import { removeFromWatchlist } from '../../../../routes/actions';
  export let coin;
</script>

<div class="{`bg-gradient-to-l rounded-lg from-[#151515] h-20
    to-[#111] py-1 px-2 border-2 duration-300 border-[#151515] w-full
    mb-2 mr-1 flex flex-col text-white text-2xl font-[main] justify-center`}">
  <div class="flex items-center justify-between">
    <div>
      <span> {coin.name} </span>
      <span class="text-[#fff3]"> #{coin.market_cap_rank} </span>
    </div>
    <div class="text-2xl">
      <span class="opacity-[.3] ml-2">
        <a href="{`/coin/${coin.id}`}">
          <i class="bx bx-show"></i>
        </a>
        <button on:click="{() => removeFromWatchlist(coin.id)}">
          <i class="bx bx-trash"></i>
        </button>
      </span>
    </div>
  </div>
  <div class="text-lg flex justify-between items-center gap-2">
    <div>
      <span class="text-[#46beff]"> ${coin.current_price} </span>
      <span> {coin.price_change_percentage_24h}% </span>
    </div>
  </div>
</div>
