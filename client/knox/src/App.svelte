<script>
	import {getCookie} from "svelte-cookie"
	import Navigation from "./components/Navigation.svelte"
	import ToastContainer from "./modules/ToastContainer.svelte"
	import CookieBanner from "./components/CookieBanner.svelte"

	$: cookieConsent = getCookie('_kc')
</script>

<Navigation />
<ToastContainer />

{#if !cookieConsent}
	<CookieBanner />
{/if}

<style>
	:root::-webkit-scrollbar{
		display: flex;
		width: 9px;
		background: rgba(50,50,50,.0001);
	}
</style>