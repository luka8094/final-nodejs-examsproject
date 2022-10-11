<script>
    export let user
    export let message
    export let placement = "border-radius: 50px 50px 50px 50px"
</script>
<div id="chatmessage-container" style="{placement}">
    {#if user !== undefined}
        <div id="chatmessage-container-user"><p><b>{user}</b> wrote:</p></div>
    {/if}
    <div id="chatmessage-container-message"><p>{message}</p></div>
</div>
<style>
    #chatmessage-container{
        display: flex;
        flex-direction: column;
        height: fit-content;
        width: initial;    
        max-width: 100%;
        padding: 10px;
        margin: 5px 1px;
        border: solid 1px black;
        background: rgba(250,250,250,.5);
        word-break: break-word;
    }

    #chatmessage-container-user{
        display: flex;
        border-bottom: solid 1px black;
        padding-bottom: 5px;
    }

    #chatmessage-container-message{
        display: flex;
        word-wrap: break-word;
        padding: 5px;
    }

    p{
        margin: 0;
    }
</style>