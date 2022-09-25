<script>
    import {useNavigate} from "svelte-navigator"
    import {user, account} from "../../stores/systemd"

    let navigate = useNavigate()

    $: (async function (){
        const result = await fetch("/api/user")

        if(result.status === 205){
            const {data} = result.json()
            $account = [...data]
        }
        else navigate("/", {replace: true})
    })()

    function logout(){
        $user = null    
        navigate("/",{replace: true})
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