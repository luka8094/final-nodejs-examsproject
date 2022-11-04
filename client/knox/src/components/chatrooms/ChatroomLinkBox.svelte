<script>
    import {useNavigate} from "svelte-navigator"
    
    export let coin, coinName
    let navigate = useNavigate() 

    function forward(){
        navigate(`/chatrooms/${coinName}`, {replace: true})
    }
</script>

<div id="chatroom-box-container">
    <div id="coin-image">
        <img src={coin.image} alt={coin.name}/>
    </div>
    <div id="chatroom-description">
        <h1>{coin.name}</h1>
        <button on:click={forward}>Join the {coin.name} chat!</button>
    </div>
</div>

<style>
    #chatroom-box-container{
        display: flex;
        height: fit-content;
        width: 500px;
        margin: 10px;
        padding-right: 10px;
        background: white;
        box-shadow: 1px 1px 10px 1px;
    }

    #coin-image{
        display: flex;
        height: 90px;
        width: 90px;
        margin: 10px;
    }

    img{
        object-fit: contain;
        width: 80px;
        margin: auto;
        border-radius: 50px;
    }

    #chatroom-description{
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }

    h1{
        margin: 0;
    }

    button{
        display: flex;
        align-self: center;
        width: 100%;
        height: 100%;
        margin-top: 20px;
        justify-content: center;
        background: lightgrey;
        transition: background 1s ease-in;
        border-radius: 50px;
    }

    button:hover{
       background: rgba(100,100,100,.1);
    }   
</style>