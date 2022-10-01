import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world',
		toast: (message) => {
			console.log(message)
		}
	}
});

export default app;