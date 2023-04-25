<script>
    import Line from '$lib/components/charts/Line.svelte';
    export let data;
</script>

<!-- HOME PAGE BITCOIN DATA & CHART -->
<div class="mb-4 w-full lg:pr-6">
    <div class="flex items-center mb-4">
        <i class="bx bxs-circle text-[10px] mr-2" />
        <span class="font-[main] text-2xl">
            {data?.data ? `${data.data[0]?.name} $${data.data[0]?.current_price}`
                : 'Loading...'}
        </span>
    </div>
    <Line id={'bitcoin'} />
</div>
