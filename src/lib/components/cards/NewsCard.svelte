<script>
export let news
</script>

<a href={news?.url} target="_blank" rel="noreferrer">
  <div class="py-2">
    <h2 class="font-[main] text-lg md:text-2xl">{news?.title}</h2>
    <span>by {news?.author}</span>
  </div>
</a>
