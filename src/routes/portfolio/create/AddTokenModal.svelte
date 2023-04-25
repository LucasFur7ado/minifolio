<script>
  import { addToken } from '../actions';
  import { slide } from 'svelte/transition';
  import ind from '$lib/store/indicators.js';
</script>

<div transition:slide
  class="lg:w-80 w-[90%] rounded-lg fixed top-[50%] left-[50%] 
    translate-x-[-50%] translate-y-[-50%]
    bg-[#111] border-[1px] border-[#202020] font-[main] text-center p-4">
  <span class="text-2xl">{$ind.open.name} amount</span>
  <input on:keyup="{e => ($ind.open.amount = e.target.value)}"
    type="text"
    class="mt-4 rounded-[5px] border-b-[1px] border-b-[#222] 
    px-4 py-2 w-full bg-[#171717] text-[22px] font-[main] mb-2"
    placeholder="Amount"
    name="amount" />
  <div class="w-full text-right">
    <span class="text-red-500 font-[main] text-lg">
      {$ind.error2 ? $ind.error2 : ''}
    </span>
  </div>
  <button on:click="{addToken}"
    class="rounded-[5px] mt-2 text-black p-2 
    bg-gradient-to-r from-white to-[#46beff] duration-300 hover:rounded-3xl
    w-full text-[22px] font-[main] cursor-pointer">
    Add
  </button>
</div>
