<script>
    import {fade} from "svelte/transition"
    import {io} from "socket.io-client"

    async function getUsers(){
        const result = await fetch("/api/users")
        const {data} = await result.json()
        console.log(data)
    }

    async function getChatlogs(){
        const result = await fetch("/api/chatlogs")
        const {data} = await result.json()
        console.log(data)
    }

    async function getAttempts(){
        const result = await fetch("/api/attempts")
        const {data} = await result.json()
        console.log(data)
    }

    function broadcastMessage(){
        console.log("clicked broadcast message")
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
        <p class="settings-description">List all currently registered users on the platform.</p>
        <button on:click={getUsers}>List users</button>
    </article>
    <article id="attempts-overview">
        <div class="admin-options-title-container">
            <h2 class="admin-options-title">Get system login attempts</h2>
        </div>
        <p class="settings-description">Get an overview of unauthorized login activity.</p>
        <button on:click={getAttempts}>List attempts</button>
    </article>
    <article id="chatlogs-overview">
        <div class="admin-options-title-container">
            <h2 class="admin-options-title">Get All chatlogs</h2>
        </div>
        <p class="settings-description">Gain an overview of conversations from specific chatrooms.</p>
        <button on:click={getChatlogs}>List chatlogs</button>
    </article>
    <article id="broadcast-message">
        <div class="admin-options-title-container">
            <h2 class="admin-options-title">Broadcast message</h2>
        </div>
        <p class="settings-description">Broadcast a tailor-made message to all chatrooms.</p>
        <button on:click={broadcastMessage}>Broadcast message</button>
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
        width: calc(100% - 15px);
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

    button{
        display: flex;
        border-radius: 50px;
        height: 35px;
        margin: 10px 10px 10px auto;
    }
</style>