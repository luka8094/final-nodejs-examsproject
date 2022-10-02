<script>
	import Navigation from "./components/Navigation.svelte"
	import ToastContainer from "./modules/ToastContainer.svelte"
</script>

<Navigation />
<ToastContainer />

<style>
	:root::-webkit-scrollbar{
		display: flex;
		width: 9px;
		background: rgba(50,50,50,.0001);
	}
</style>