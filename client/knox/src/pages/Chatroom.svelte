<script>
    import {onDestroy, afterUpdate} from "svelte"
    import {io} from "socket.io-client"
    import {account, milestones} from "../../stores/systemd"
    import Chatmessage from "../components/chatroom/Chatmessage.svelte"
    import CoinStatistics from "../components/chatroom/CoinStatistics.svelte"

    const socket = io()
    export let id
    let message
    let chatroomMessages = []
    let color
    let milestonesArray = $milestones

    $: if(message){
        if(message.length <= 255 | message === '') color = "black"
        if(message.length === 255) color = "red"
    }

    socket.on("connect", () => {
        const message = `${$account.username} has joined the chatroom. Say hi!`
        socket.emit("chatmessageSent", {data: {message: message, user: undefined}})
    })

    function sendMessage(){
        message.trim()

        if(message.length === 0) return
        console.log(++milestonesArray[1].currentValue, milestonesArray)
        socket.emit("chatmessageSent", {data: {message: message, user: $account.username}})

        message = ''
    }

    socket.on("showChatmessage", ({data}) =>{
        chatroomMessages.push(data)
        chatroomMessages = chatroomMessages
    })

    socket.on("disconnect", () =>{
        const message = `${$account.username} has left the chatroom.`
        socket.emit("chatmessageSent",{data: {message: message, user: undefined}})
    })

    onDestroy(async () => {
        const saveMilestones = $milestones
        const milestonesWorker = new Worker('/scripts/milestonesWorker.js')

        milestonesWorker.postMessage(saveMilestones)

        milestonesWorker.onmessage = function(message){
            console.log(message)
        }
    })
</script>

<section id="chatroom-container">
    <!--<aside id="chatroom-participants-container">
        participants
    </aside>-->
    <aside id="chatlog-container">
        <div id="chatlog-history">
            {#each chatroomMessages as data}
                {#if data.user === undefined}
                    <Chatmessage user={undefined} message={data.message} placement={"border-radius: 10px 10px 10px 10px;"}/>
                {:else if data.user === $account.username}
                    <Chatmessage user={"you"} message={data.message} placement={"margin-left:auto; border-radius: 35px 0 50px 50px;"} />
                {:else if data.user !== $account.username}
                    <Chatmessage user={data.user} message={data.message} placement={"margin-right:auto; border-radius: 0 35px 50px 50px;"}/>
                {/if}
            {/each}
        </div>
        <aside id="chat-panel-container">
            <div id="chat-panel">
                <textarea maxlength="255" bind:value={message} placeholder="Chat away!"></textarea>
                <span style="color:{color}">{message ? message.length : 0}/255</span>
            </div>
            <button on:click={sendMessage}>send</button>
        </aside>
    </aside>
    <CoinStatistics coinId={id}/>
</section>

<style>
    #chatroom-container{
        display: flex;
        height: 100vh;
        width: 100%;
        padding: 90px 0 50px 0;
        background: white;
        justify-content: center;
        -webkit-scrollbar-track: transparent;
    }

    #chatlog-container{
        display: flex;
        flex-direction: column;
        height: 600px;
        width: 400px;
        padding: 10px;
        background: white;
    }

    #chatlog-history{
        display: flex;
        flex-direction: column;
        height: 500px;
        width: 400px;
        background: rgba(0,0,0,.1);
        overflow-y: scroll;
        border: solid 1px black;
    }

    #chat-panel{
        display: flex;
        flex-direction: column;
        width: 350px;
        background: white;
        justify-content: space-around;
    }

    #chat-panel-container{
        display: flex;
        width: 400px;
        padding: 10px 0;
        background: white;
    }

    textarea{
        display: flex;
        min-height: 100px;
        max-height: 120px;
        min-width: 300px;
        max-width: 310px;
    }

    span{
        display: flex;
        margin: 5px 0;
    }

    button{
        display: flex;
        width: 70px;
        height: fit-content;
        border-radius: 50px;
        align-items: center;
        justify-content: center;
        background: lightgrey;
        transition: background .5s ease-in;
    }
    
    button:hover{
        background: rgba(100,100,100,.2);
    }
</style>