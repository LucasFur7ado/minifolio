<svelte:head>
  <title>About - minifolio</title>
  <meta name="description" content={`About minifolio`} />
</svelte:head>

<section>
  <div class="border-l-4 px-4 mb-8">
    <h1 class="font-[main] text-2xl">
      Minifolio is a Crypto and News datacenter for chad users.
    </h1>
  </div>
  <div class="text-lg">
    <p>
      Developed by
      <a
        rel="noreferrer"
        href="https://lucasfurtado.xyz"
        target="_blank"
        class="text-[#46beff]">lucasfurtado.xyz</a>
      in SvelteKit and TailwindCSS.
    </p>
    <div
      class="md:w-[190px] mt-8 bg-gradient-to-r from-red-500 duration-300 hover:rounded-3xl to-blue-500 w-full p-1 rounded-lg">
      <button
        class="md:w-[180px] relative flex items-center justify-center bg-[#111] font-[main] text-[18px] w-full rounded-lg duration-300 hover:rounded-3xl px-4 py-6">
        <a class="py-4 absolute w-full" href="/"> Go back </a>
      </button>
    </div>
  </div>
</section>
