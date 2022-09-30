<script>
	import customToast from "../functionality/toasters"
	import Navigation from "./components/Navigation.svelte"

	let toaster
	customToast(toaster)
</script>

<Navigation/>

<style>
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