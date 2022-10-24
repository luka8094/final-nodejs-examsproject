<script>
    import {useNavigate, useLocation, useParams} from "svelte-navigator"
    
    export let coin, coinName
    let description = "This is a description placeholder for the cryptocurrency coin."
    let navigate = useNavigate() 
    let params = useParams()
    let location = useLocation()

    function forward(){
        console.log(coinName, coin, $params, $params.id, $location)
        console.log(`localhost:3000/chatrooms/${coinName}`)
        navigate(`/chatrooms/${coinName}`, {replace: true})
    }
</script>

<div id="chatroom-box-container">
    <div id="coin-image"></div>
    <div id="chatroom-description">
        <p>{description}</p>
        <button on:click={forward}>Join {coinName}</button>
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