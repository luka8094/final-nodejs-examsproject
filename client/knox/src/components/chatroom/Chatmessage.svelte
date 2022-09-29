<script>
    export let user = "guest"
    export let message
</script>
<div id="chatmessage-container">
    <div id="chatmessage-container-user">{user} wrote:</div>
    <div id="chatmessage-container-message">{message}</div>
</div>
<style>
    #chatmessage-container{
        display: flex;
        flex-direction: column;
        height: fit-content;
        width: initial;
        padding: 10px;
        margin: 5px 1px;
        border: solid 1px black;
        border-radius: 50px 0 50px 50px;
        background: rgba(250,250,250,.5);
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
</style>