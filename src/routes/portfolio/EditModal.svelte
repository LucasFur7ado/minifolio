<script>
  import { editToken } from "./actions"
  import { slide } from "svelte/transition"
  import ind from "$lib/store/indicators.js"
  import portfolioStore from "$lib/store/portfolio.js"
</script>

<div transition:slide class="lg:w-80 w-[90%] rounded-lg fixed top-[50%] left-[50%] 
      translate-x-[-50%] translate-y-[-50%]
      bg-[#111] border-[1px] border-[#202020] font-[main] text-center p-4">
  <span class="text-2xl">Edit {$portfolioStore?.isEditing?.name}</span>
  <form on:submit={(e) => {
    e.preventDefault()
    editToken($portfolioStore?.isEditing?.id, $portfolioStore?.isEditing?.amount)
  }}>
    <input type="text" class="mt-4 rounded-[5px] border-b-[1px] border-b-[#222] 
      px-4 py-2 w-full bg-[#171717] text-[22px] font-[main] mb-2"
      placeholder="Amount"
      on:keyup={(e) => $portfolioStore.isEditing == null 
      ? null :($portfolioStore.isEditing.amount = e.target.value)}
      value={$portfolioStore?.isEditing?.amount}
      name="amount" />
    <div class="w-full text-right">
      <span class="text-red-500 font-[main] text-lg">
        {$ind.error2 ? $ind.error2 : ""}
      </span>
    </div>
    <button class="rounded-[5px] mt-2 text-black p-2 
      bg-gradient-to-r from-white to-[#46beff] duration-300 hover:rounded-3xl
      w-full text-[22px] font-[main] cursor-pointer">
      Save
    </button>
  </form>
</div>
