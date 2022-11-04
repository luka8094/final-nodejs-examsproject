<script>
    import {io} from "socket.io-client"
    import {fade} from "svelte/transition"
    import AttemptsOverview from "./admin/AttemptsOverview.svelte"
    import {privileged} from "../../../../stores/systemd"

    const socket = io()
    let users
    let attempts


    async function getUsers(){
        const result = await fetch("/api/users")
        const {data} = await result.json()
        users = data
    }

    async function getChatlogs(){
        const result = await fetch("/api/chatlogs")
        const {data} = await result.json()
        console.log(data)
    }

    async function getAttempts(){
        const result = await fetch("/api/attempts")
        const {data} = await result.json()
        attempts = data
    }

    function broadcastMessage(){
        socket.emit('serviceAnnouncement',{data: message})
    }
</script>

{#if $privileged}
    <div id="administrator-settings-container">
        <h2>Administrator tools</h2>
        <article id="attempts-overview">
            <div class="admin-options-title-container">
                <h2 class="admin-options-title">Get system login attempts</h2>
            </div>
            <p class="settings-description">Get an overview of unauthorized login activity.</p>
            {#if attempts}
                {#each attempts as attempt}
                    <AttemptsOverview 
                    date={attempt.createdAt}
                    email={attempt.useremail} 
                    password={attempt.password}
                    ipVFour={attempt.ipvFour}
                    ipVSix={attempt.ipvSix}
                    machine={attempt.machine}
                    />
                {/each}
            {/if}
            <button on:click|preventDefault={getAttempts}>List attempts</button>
        </article>
    </div>  
{/if}

<style>
    #administrator-settings-container{
        display: flex;
        flex-direction: column;
        height: 550px;
        width: 900px;
        padding-left: 20px;
        background: rgba(255,255,255,.5);
        overflow-y: scroll;
    }

    h2{
        border-bottom: solid 1px black;
        width: 300px;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }

    article{
        color: grey;
        word-break: break-word;
        width: 300px;
        margin-bottom: 20px;
        padding-bottom: 10px;
    }

    #users-overview,
    #chatlogs-overview,
    #attempts-overview,
    #broadcast-message
    {
        display: flex;
        flex-direction: column;
        width: 90%;
        padding: 10px;
        background: rgba(255,255,255,.5);
        align-items: center;
        justify-content: center;
    }

    .admin-options-title-container{
        display: flex;
        height: 50px;
        width: 100%;
        margin-right: auto;
        border-bottom: solid 1px black;
        align-items: center;
    }

    .admin-options-title{
        border: none;
    }

    .settings-description{
        margin-right: auto;
    }

    #service-announcement-box{
        display: flex;
        min-height: 50px;
        max-height: 100px;
        min-width: 70px;
        max-width: 200px;
        margin-right: auto;
    }

    button{
        display: flex;
        border-radius: 50px;
        height: 35px;
        margin: 10px 10px 10px auto;
    }
</style>