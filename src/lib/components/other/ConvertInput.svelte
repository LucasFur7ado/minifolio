<script>
    import { searchConvert, setValue, discloseConvert } from "../../../routes/actions";
    import convertStore from '$lib/store/convert.js';
    export let nr; 
</script>

<div class="relative flex items-center justify-between 
    rounded-lg bg-[#151515] h-10 my-1">
  <input on:keyup="{searchConvert}"
    class="{`duration-500 ${$convertStore.opens[nr] ? 'w-full px-4' : 'w-0 p-0'} 
    h-10 absolute top-0 left-0 bg-[#151515] rounded-lg flex items-center`}"
    placeholder="Search"
    type="text" /> 
  <div on:keydown="{null}"
    on:click="{() => discloseConvert(nr + 1)}"
    class="duration-200 hover:bg-[#202020] h-10 pl-4 
    flex items-center w-full rounded-lg cursor-pointer">
    <span>{$convertStore.coins[nr]?.symbol?.toUpperCase()
    ?? '. . .'}</span>
  </div>
  <input on:keyup="{setValue}"
    class="bg-transparent w-40 duration-200 
    p-2 hover:bg-[#202020] rounded-lg text-center"
    value="{$convertStore.values[nr]}"
    type="text"
    name={nr == 0 ? 'first' : ''} />
</div>
