<script>
    import {useNavigate} from "svelte-navigator"
    
    export let number
    let description = "This is a description placeholder for the cryptocurrency coin."
    let navigate = useNavigate() 

    function forward(){
        navigate(`/chatrooms/:${number}`, {replace: true})
    }
</script>

<div id="chatroom-box-container">
    <div id="coin-image"></div>
    <div id="chatroom-description">
        <p>{description}</p>
        <button on:click={forward}>Join {number}</button>
    </div>
</div>

<style>
    #chatroom-box-container{
        display: flex;
        height: fit-content;
        width: 250px;
        margin: 10px;
        background: rgba(50,50,50,.5);
    }

    #coin-image{
        display: flex;
        height: 90px;
        width: 90px;
        margin: 10px;
        background: rgba(50,100,50,.5);
    }

    #chatroom-description{
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 150px;
    }

    #chatroom-description p{
        display: flex;
        height: fit-content;
        width: 130px;
        margin: 10px 0 0;
        background: rgba(50,50,50,.5);
    }

    button{
        display: flex;
        align-self: center;
        width: 100%;
        height: 100%;
        justify-content: center;
        background: rgba(10,10,10,.1);
    }

    button:hover{
        text-decoration: underline;
    }
</style>