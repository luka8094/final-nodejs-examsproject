<script>
	import Navigation from "./components/Navigation.svelte"
	import Footer from "./components/Footer.svelte"
</script>

<Navigation/>
<div id="toaster-container">
	toaster container 
</div>

<style>
	#toaster-container{
		display: flex;
		position: fixed;
		height: 100px;
		width: 150px;
		background: rgba(50,100,150,.5);
		z-index: 10;
		right: 30px;
		bottom: 20px;
	}
</style>