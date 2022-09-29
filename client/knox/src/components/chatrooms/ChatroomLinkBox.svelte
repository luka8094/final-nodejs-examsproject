<script>
    import {useNavigate} from "svelte-navigator"
    
    export let number
    let navigate = useNavigate() 

    function forward(){
        navigate(`/chatrooms/:${number}`, {replace: true})
    }
</script>

<div id="chatroom-box-container">
    <img src="" alt=""/>
    <div id="chatroom-description">
        <p></p>
        <button on:click={forward}>enter {number}</button>
    </div>
</div>

<style>
    #chatroom-box-container{
        display: flex;
        height: 100px;
        width: 250px;
        margin: 10px;
        background: rgba(50,50,50,.5);
    }

    img{
        display: flex;
        height: 90px;
        width: 90px;
        background: rgba(50,100,50,.5);
    }

    #chatroom-description{
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 150px;
    }
</style>