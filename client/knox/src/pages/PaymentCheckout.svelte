<script>
    import {loadStripe} from "@svelte/stripe-js"
    import {Elements} from "svelte-stripe"
    import {onMount} from "svelte"

    let stripe = null

    onMount(async () => {
        stripe = await loadStripe()
    })
</script>

{#if stripe}
    <Elements {stripe}/>
{/if}