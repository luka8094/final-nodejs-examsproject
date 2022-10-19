<script>
    export let user, message
    export let placement = "border-radius: 50px 50px 50px 50px"
    const time = new Date()
</script>

<div id="chatmessage-container">
    <div id="chatmessage-time">
        {time.getHours() < 10 ? "0"+time.getHours() : time.getHours()}:
        {time.getMinutes() < 10 ? "0"+time.getMinutes() : time.getMinutes()}:
        {time.getSeconds() < 10 ? "0"+time.getSeconds() : time.getSeconds()}</div>
    <div id="chatmessage-holder" style="{placement}">
        {#if user !== undefined}
            <div id="chatmessage-holder-user"><p><b>{user}</b> wrote:</p></div>
        {/if}
        <div id="chatmessage-holder-message"><p>{message}</p></div>
    </div>
</div>

<style>
    #chatmessage-container{
        display: flex;
    }

    #chatmessage-holder{
        display: flex;
        flex-direction: column;
        height: fit-content;
        width: initial;    
        max-width: calc(100% - 111px);
        padding: 10px;
        margin: 5px 1px;
        border: solid 1px black;
        background: rgba(250,250,250,.5);
        word-break: break-word;
    }

    #chatmessage-holder-user{
        display: flex;
        border-bottom: solid 1px black;
        padding-bottom: 5px;
    }

    #chatmessage-holder-message{
        display: flex;
        word-wrap: break-word;
        padding: 5px;
    }

    #chatmessage-time{
        display: flex;
        width: 90px;
        justify-content: center;
    }

    p{
        margin: 0;
    }
</style>