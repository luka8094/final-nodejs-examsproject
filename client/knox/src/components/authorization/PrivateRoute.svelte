<script>
    //inspired by source: https://svelte.dev/repl/c81d8f3dff584065a82b2d3ea7cd4aee?version=3.50.1
    import {Route} from "svelte-navigator"
    import ProtectedRoute from "./ProtectedRoute.svelte"

    export let path
</script>

<Route {path} let:params let:location let:navigate>
    <ProtectedRoute id={params.id}>
        <slot {params} {location} {navigate} />
    </ProtectedRoute>
</Route>

<style>

</style>