<script>
    import {onMount} from "svelte"
    import {useNavigate} from "svelte-navigator"
    import {user, account} from "../../stores/systemd"
    import Dashboard from "../components/account/Dashboard.svelte"

    let navigate = useNavigate()
    
    onMount(async () => {
        const result = await fetch("/api/user")

        if(result.status === 201){
            const {data} = await result.json()
            return $account = data
        }
        if(result.status === 401 || result.status === 403){ navigate("/")}
    })

    const logout = async () => {
        const result = await fetch("/api/logout",{
            method: 'DELETE'
        })

        if(result.status === 202)
        {   
            $user = null  
            $account = []
            navigate("/login")
        }
    }
</script>
<section>
    <div id="account-headline">
        <p>Account</p>
        <button on:click={logout}>logout</button>
    </div>
    <Dashboard username={$account.username}/>
</section>

<style>
    section{
        display:flex;
        flex-direction: column;
        min-height: 100vh;
        width: 100%;
        background: rgba(10,250,150,.5);
        padding-top: var(--menu-padding);
        align-items: center;
        justify-content: center;
    }

    #account-headline{
        display: flex;
    }
</style>