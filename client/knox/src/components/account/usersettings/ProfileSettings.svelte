<script>
    import {Wave} from "svelte-loading-spinners"
    import {account, milestones} from "../../../../stores/systemd"
    import {toast} from "../../../modules/ToastContainer.svelte"

    let description

    async function saveDescription(){
        const response = await fetch("/api/description",{
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({description: description})
        })

        if(response.status === 201){ 
            const result = await response.json()
            const {data} = await result
            toast(data,0)
            $milestones[4].currentValue++
        }
        if(result.status === 503){
            const result = await response.json()
            const {data} = await result
            return toast(data,1)
        }
    }
</script>
<div>
    <h2>Profile settings</h2>
    <article id="account-overview">
        In this section you have a brief oveview of your account details.
        {#if $account.name}
            <p>name: {$account.name}</p>
            <p>email: ********@{$account.email ? $account.email.toString().split("@")[1] : ""} </p>
        {:else}
            <Wave size="50" unit="px" color="#d3d0cf" duration="1s" />
        {/if}
    </article>
    <article id="account-description">
        Add an optional profile description to your account and user profile.
    </article>
    <textarea minlength="8" maxlength="255" bind:value={description}></textarea>
    <button on:click={saveDescription}>save</button>
</div>

<style>
    div{
        display: flex;
        flex-direction: column;
        height: 100%;
        padding-left: 20px;
        background: rgba(255,255,255,.5);
    }

    h2{
        border-bottom: solid 1px black;
        width: 50%;
        margin-bottom: 20px;
        padding-bottom: 10px;
    }

    #account-overview,
    #account-description{
        color: grey;
        word-break: break-word;
        width: 300px;
        margin-bottom: 20px;
        padding-bottom: 10px;
        font-size: 20px;
    }

    textarea{
        max-width: 400px;
        min-width: 300px;
        display: flex;
        min-height: 100px;
        max-height: 150px;
    }

    button{
        width: 50px;
    }
</style>