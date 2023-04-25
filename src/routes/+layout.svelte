<script>
    import '../app.css';
    import 'nprogress/nprogress.css';
    import NProgress from 'nprogress';
    import Footer from './Footer.svelte';
    import NavBar from './NavBar.svelte';
    import { navigating } from '$app/stores';

    NProgress.configure({
        minimum: 0.16,
        showSpinner: false,
    });
    $: {
        if ($navigating) NProgress.start();
        if (!$navigating) NProgress.done();
    }
</script>

<div class="app">
    <NavBar />
    <main class="bg-[#111] min-h-screen flex flex-col items-center p-4 xl:px-32">
        <slot />
    </main>
    <Footer />
</div>
