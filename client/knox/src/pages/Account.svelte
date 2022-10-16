<script>
    import {onMount, onDestroy} from "svelte"
    import {useNavigate} from "svelte-navigator"
    import {user, account, milestones, preferences} from "../../stores/systemd"
    import Dashboard from "../components/account/Dashboard.svelte"

    let navigate = useNavigate()
    
    onMount(async () => {
            const result = await fetch("/api/user")

            if(result.status === 201){
                const {data} = await result.json()
                console.log(data)
                if($milestones.length === 0) $milestones = data.milestones
                $preferences = data.preferences
                console.log($milestones, $preferences)
                return $account = data
            }
            if(result.status === 401 || result.status === 403){ navigate("/login")}
    })

    const logout = async () => {
        const result = await fetch("/api/logout",{
            method: 'DELETE'
        })

        if(result.status === 202)
        {   
            $user = null  
            $account = []
            $milestones = []
            $preferences = []
            navigate("/login")
        }
    }
</script>

<section>
    <Dashboard username={$account.username} logout={logout}/>
</section>

<style>
    section{
        display:flex;
        flex-direction: column;
        min-height: 100vh;
        width: 100%;
        background: white;
        padding-top: calc(var(--menu-padding) + 50px);
        align-items: center;
        justify-content: center;
    }
</style>