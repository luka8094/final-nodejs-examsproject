<script>
    import {fade} from "svelte/transition"

    async function getUsers(){
        const result = await fetch("/api/users")
        console.log(result.json())
    }
</script>

<div id="administrator-settings-container">
    <h2>Administrator tools</h2>
    <article>
        <p id="quote" in:fade>"With great power comes great responsibility"</p>
        Administer operations and settings on the KNOX webapp.
    </article>
    <article id="users-overview">
        <div class="admin-options-title-container">
            <h2 class="admin-options-title">Get all system users</h2>
        </div>
        <button on:click={getUsers()}>Show users</button>
    </article>
    <article id="attempts-overview">
        <div class="admin-options-title-container">
            <h2 class="admin-options-title">Get system login attempts</h2>
        </div>
        <button on:click={getAttempts()}>Show attempts</button>
    </article>
    <article id="chatlogs-overview">
        <div class="admin-options-title-container">
            <h2 class="admin-options-title">Get All chatlogs</h2>
        </div>
        <button on:click={getChatlogs()}>Show chatlogs</button>
    </article>
    <article id="broadcast-message">
        <div class="admin-options-title-container">
            <h2 class="admin-options-title">Broadcast message</h2>
        </div>
        <button on:click={broadcastMessage()}>Broadcast message</button>
    </article>
</div>  

<style>
    #administrator-settings-container{
        display: flex;
        flex-direction: column;
        height: 600px;
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
        font-size: 20px;
    }

    article{
        color: grey;
        word-break: break-word;
        width: 300px;
        margin-bottom: 20px;
        padding-bottom: 10px;
    }

    #quote{
        font-style: italic;
    }

    #users-overview,
    #chatlogs-overview,
    #attempts-overview,
    #broadcast-message
    {
        display: flex;
        flex-direction: column;
        height: 250px;
        width: 100%;
        background: rgba(255,255,255,.5);
        align-items: center;
        justify-content: center;
    }

    .admin-options-title-container{
        display: flex;
        height: 50px;
        width: 90%;
        margin-right: auto;
        border-bottom: solid 1px black;
        align-items: center;
        justify-content: space-between;
    }

    .admin-options-title{
        border: none;
    }

    button{
        border-radius: 50px;
        height: 35px;
    }
</style>