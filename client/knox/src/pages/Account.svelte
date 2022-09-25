<script>
    import {onMount} from "svelte"
    import {useNavigate} from "svelte-navigator"
    import {user, account} from "../../stores/systemd"

    let navigate = useNavigate()

    
    onMount(async () => {
        const result = await fetch("/api/user")

        if(result.status === 201){
            const {data} = await result.json()
            console.log(data)
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
            navigate("/")
        }
    }
</script>
<section>
    <p>Account</p>
    <button on:click={logout}>logout</button>
    <div>
        <p>{JSON.stringify($account)}</p>
    </div>
</section>

<style>
    section{
        display:flex;
        height: 100vh;
        width: 100%;
        background: rgba(10,250,150,.5);
        padding-top: var(--menu-padding);
        align-items: center;
        justify-content: center;
    }
</style>