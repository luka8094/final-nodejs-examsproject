<script>
    import io from "socket.io-client"
    import Chatmessage from "../components/chatroom/Chatmessage.svelte"
    import CoinStatistics from "../components/chatroom/CoinStatistics.svelte"

    console.log(io)

    let array = [
        {text: "hi"},
        {text: "hello"},
        {text: "hi"},
        {text: "hello"},
        {text: "hi"},
        {text: "hello"},
        {text: "hi"},
        {text: "hello"},
        {text: "hi"},
        {text: "hello"},
        {text: "hi"},
        {text: "hello"},
    ]

    function sendMessage(){
        console.log("message sent.")

    }

    function receiveMessag(){
        console.log("message recieved.")
    }
</script>

<section id="chatroom-container">
    <aside id="chatlog-container">
        <h2>Welcome to the room</h2>
        <div id="chatlog-history">
            {#each array as message}
                <Chatmessage message={message.text}/>
            {/each}
        </div>
        <div id="chat-panel">
            <textarea></textarea>
            <button on:click={sendMessage}>send</button>
        </div>
    </aside>
    <CoinStatistics/>
</section>

<style>
    #chatroom-container{
        display: flex;
        height: 100vh;
        width: 100%;
        padding-top: 90px;
        background: rgba(100,100,100,.5);
    }

    #chatlog-container{
        display: flex;
        flex-direction: column;
        height: 600px;
        width: 350px;
        padding-left: 10px;
        background: rgba(50,50,150,.5)
    }

    #chatlog-history{
        display: flex;
        flex-direction: column;
        height: 500px;
        width: 300px;
        background: rgba(50,100,50,.5);
        overflow-y: scroll;
    }

    #chatlog-history::-webkit-scrollbar-track{
        background-color: rgba(255,255,255,.5);
        width: 10px;
    }

    #chat-panel{
        display: flex;
        width: 300px;
        padding-top: 10px;
        background: rgba(100,100,100,.5);
        justify-content: space-around;
    }

    textarea{
        display: flex;
        height: 100px;
        width: 200px;
    }

    button{
        display: flex;
        width: 70px;
        height: fit-content;
        justify-content: center;
    }
</style>