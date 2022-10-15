<script>
    import {onDestroy, afterUpdate} from "svelte"
    import {io} from "socket.io-client"
    import {user, account, milestones} from "../../stores/systemd"
    import Chatmessage from "../components/chatroom/Chatmessage.svelte"
    import CoinStatistics from "../components/chatroom/CoinStatistics.svelte"

    const socket = io()
    export let COIN_ID
    let message
    let chatroomMessages = []
    let color
    let milestonesArray = $milestones
    
    $: if(message){
        if(message.length <= 255 | message === '') color = "black"
        if(message.length === 255) color = "red"
    }

    socket.on("connect", () => {
        console.log("Weclome %s. Your socket id is: &s", $account.username, socket.id)
        const message = `${$account.username} has joined the chatroom. Say hi!`
        socket.emit("chatmessageSent", {data: {message: message, user: undefined}})
    })

    function sendMessage(){
        console.log(++milestonesArray[1].currentValue, milestonesArray)
        //$milestones = milestonesArray
        message.trim()
        console.log(message.trim())
        if(message.length === 0) return
        socket.emit("chatmessageSent", {data: {message: message, user: $account.username}})

        message = ''
    }

    socket.on("showChatmessage", ({data}) =>{
        chatroomMessages.push(data)
        chatroomMessages = chatroomMessages
    })

    socket.on("disconnect", () =>{
        console.log(socket.id)
        const message = `${$account.username} has left the chatroom.`
        socket.emit("chatmessageSent",{data: {message: message, user: undefined}})
    })

    /*
    onDestroy(() => {
        $milestones = milestonesArray
        console.log($milestones)
    })

    afterUpdate(() => {
        $milestones = milestonesArray
        console.log($milestones)
    })*/
</script>

<section id="chatroom-container">
    <aside id="chatroom-participants-container">
        participants
    </aside>
    <aside id="chatlog-container">
        <h2>Welcome to the room</h2>
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
    <CoinStatistics coinName={COIN_ID}/>
</section>

<style>
    #chatroom-container{
        display: flex;
        height: 100vh;
        width: 100%;
        padding: 90px 0 50px 0;
        background: rgba(100,100,100,.5);
        justify-content: center;
        -webkit-scrollbar-track: transparent;
    }

    #chatroom-participants-container{
        display: flex;
        height: 600px;
        width: 150px;
        background: rgba(255,55,255,.5)
    }

    #chatlog-container{
        display: flex;
        flex-direction: column;
        height: 600px;
        width: 320px;
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

    #chat-panel{
        display: flex;
        flex-direction: column;
        width: 220px;
        background: rgba(100,100,100,.5);
        justify-content: space-around;
    }

    #chat-panel-container{
        display: flex;
        width: 300px;
        padding: 10px 0;
        background: rgba(200,200,200,.5);
    }

    textarea{
        display: flex;
        min-height: 100px;
        max-height: 120px;
        min-width: 200px;
        max-width: 210px;
    }

    span{
        display: flex;
        margin: 5px 0;
    }

    button{
        display: flex;
        width: 70px;
        height: fit-content;
        justify-content: center;
    }
</style>