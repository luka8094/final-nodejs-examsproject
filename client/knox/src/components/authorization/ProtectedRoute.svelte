<script>
    //inspired by source: https://svelte.dev/repl/c81d8f3dff584065a82b2d3ea7cd4aee?version=3.50.1
    import {useNavigate, useLocation} from "svelte-navigator"
    import {user, account, milestones, preferences, description, cancelSignal} from "../../../stores/systemd"
    
    const navigate = useNavigate()
    const location = useLocation()
    
    ;(async function(){
        const result = await fetch("/api/token",{
            $cancelSignal
        })
        const {loggedIn} = await result.json()
        if(loggedIn === false){
            $user = null
            $account = null
            $milestones = []
            $description = null
            $preferences = []
        }
        $user = loggedIn
    })()

    $: if (!$user){
        navigate("/",{
            state: {from: $location.pathname},
            replace: true
        })
    }
</script>

{#if $user}
    <slot />
{/if}