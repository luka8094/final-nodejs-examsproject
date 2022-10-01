<script>
	import Navigation from "./components/Navigation.svelte"
	import ToastContainer from "./components/ToastContainer.svelte"
</script>

<Navigation />
<ToastContainer />

<style>
	:root::-webkit-scrollbar{
		display: flex;
		width: 9px;
		background: rgba(50,50,50,.0001);
	}

	#toaster-container{
		display: flex;
		position: fixed;
		height: 100px;
		width: 150px;
		background: rgba(50,150,150,.5);
		z-index: 10;
		right: 30px;
		bottom: 20px;
	}
</style>