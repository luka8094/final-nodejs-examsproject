<script>
    import {onDestroy} from "svelte"
    import {useNavigate} from "svelte-navigator"
    import {user, privileged, account, milestones, preferences, cancelSignal, requestCanceller} from "../../stores/systemd"
    import Dashboard from "../components/account/Dashboard.svelte"

    let navigate = useNavigate()
    
    ;(async function(){
        const result = await fetch("/api/user", {$cancelSignal})

        if(result.status === 201){
        const {data} = await result.json()
        if($milestones.length === 0){
            $milestones = data.milestones
            $milestones[0].currentValue++
        } 
        $preferences = data.preferences
        return $account = data
        }
        if(result.status === 401 || result.status === 403) navigate("/login")

    })()

    const logout = async () => {
        $requestCanceller.abort()

        const result = await fetch("/api/logout",{
            method: 'DELETE'
        })

        if(result.status === 202)
        {   
            $user = null
            $account = []
            $milestones = []
            $preferences = []
            if($privileged) $privileged = null 
            navigate("/login")
        }
    }

    onDestroy(async () => {
        const saveMilestones = $milestones
        const milestonesWorker = new Worker('/scripts/milestonesWorker.js')

        milestonesWorker.postMessage(saveMilestones)

        milestonesWorker.onmessage = function(message){
            console.log(message)
        }
    })
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